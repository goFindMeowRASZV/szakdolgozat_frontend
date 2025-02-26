import React, { useState } from 'react';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import useAuthContext from '../model/contexts/AuthContext';
import MacsCard from './MacsCard';


const Szures = () => {
    const { menhelyLISTA,getReportsFilter } = useAuthContext();
    const [formData, setFormData] = useState({
        color: [],
        pattern: [],
        startDate: "",
        endDate: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (checked) {
            setFormData({
                ...formData,
                [name]: [...formData[name], value]
            });
        } else {
            setFormData({
                ...formData,
                [name]: formData[name].filter(item => item !== value)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // API hívás szűrési feltételekkel
        const filters = {
            color: formData.color.join(','),
            pattern: formData.pattern.join(','),
            startDate: formData.startDate,
            endDate: formData.endDate
        };

        // Lekérjük a szűrt adatokat
        /* await getMacsCard(filters);  // Használhatod itt a szűrőkkel rendelkező API hívást
        await getMacsCardMenhely(filters);  // Ha van külön menhelyi szűrés */
        await getReportsFilter(filters);
        setLoading(false);
    };



    const filteredMenhelyLista = menhelyLISTA?.filter(report => {
        if (formData.color.length === 0 && formData.pattern.length === 0) {
            return false;
        }

        const reportColor = report.color?.trim().toLowerCase();
        const reportPattern = report.pattern?.trim().toLowerCase();

        const colorMatch = formData.color.length === 0 || formData.color.some(color => reportColor.includes(color.toLowerCase()));
        const patternMatch = formData.pattern.length === 0 || formData.pattern.some(pattern => reportPattern.includes(pattern.toLowerCase()));

        return colorMatch && patternMatch;
    });


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="color">
                            <Form.Label>Szín</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Fehér"
                                value="feher"
                                checked={formData.color.includes('feher')}
                                onChange={handleChange}
                                name="color"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Fekete"
                                value="fekete"
                                checked={formData.color.includes('fekete')}
                                onChange={handleChange}
                                name="color"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Barna"
                                value="barna"
                                checked={formData.color.includes('barna')}
                                onChange={handleChange}
                                name="color"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Vörös"
                                value="voros"
                                checked={formData.color.includes('voros')}
                                onChange={handleChange}
                                name="color"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Bézs"
                                value="bezs"
                                checked={formData.color.includes('bezs')}
                                onChange={handleChange}
                                name="color"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Szürke"
                                value="szurke"
                                checked={formData.color.includes('szurke')}
                                onChange={handleChange}
                                name="color"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Egyéb"
                                value="egyeb"
                                checked={formData.color.includes('egyeb')}
                                onChange={handleChange}
                                name="color"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="pattern">
                            <Form.Label>Minta</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Cirmos"
                                value="cirmos"
                                checked={formData.pattern.includes('cirmos')}
                                onChange={handleChange}
                                name="pattern"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Foltos"
                                value="foltos"
                                checked={formData.pattern.includes('foltos')}
                                onChange={handleChange}
                                name="pattern"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Egyszínű"
                                value="egyszinu"
                                checked={formData.pattern.includes('egyszinu')}
                                onChange={handleChange}
                                name="pattern"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Teknőctarka"
                                value="teknoctarka"
                                checked={formData.pattern.includes('teknoctarka')}
                                onChange={handleChange}
                                name="pattern"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Kopasz"
                                value="kopasz"
                                checked={formData.pattern.includes('kopasz')}
                                onChange={handleChange}
                                name="pattern"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Fóka"
                                value="foka"
                                checked={formData.pattern.includes('foka')}
                                onChange={handleChange}
                                name="pattern"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Kalikó"
                                value="kaliko"
                                checked={formData.pattern.includes('kaliko')}
                                onChange={handleChange}
                                name="pattern"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="startDate">
                            <Form.Label>Keletkezési dátum</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.startDate}
                                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="endDate">
                            <Form.Label>Záró dátum</Form.Label>
                            <Form.Control
                                type="date"
                                value={formData.endDate}
                                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">Keresés</Button>
            </Form>
            {loading ? (
                <p>Betöltés...</p>
            ) : (
                <div>
                    {filteredMenhelyLista && filteredMenhelyLista.length > 0 && (
                        <div>
                            <h3>Keresési eredmény:</h3>
                            <div className="card-deck">
                                {filteredMenhelyLista.map(report => (
                                    <MacsCard key={report.id} adat={report} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Szures;
