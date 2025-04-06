// Tömörített BejelentesMenhelyModal.js (összes validált mezővel)
import React, { useState } from "react";
import { myAxios } from "../contexts/MyAxios";
import { toast } from "react-toastify";

const BejelentesMenhelyModal = ({ onClose, onSave, initialData, isShelterPage }) => {
  const [form, setForm] = useState({
    status: initialData?.status || "",
    color: initialData?.color || "",
    pattern: initialData?.pattern || "",
    other_identifying_marks: initialData?.other_identifying_marks || "",
    health_status: initialData?.health_status || "",
    chip_number: initialData?.chip_number || "",
    circumstances: initialData?.circumstances || "",
    number_of_individuals: initialData?.number_of_individuals || 1,
    disappearance_date: initialData?.disappearance_date || "",
    activity: initialData?.activity || 1,
    photo: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm({ ...form, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isShelterPage
        ? `/update-sheltered-cat/${initialData.cat_id}`
        : `/api/update-report/${initialData.report_id}`;

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      await myAxios.put(endpoint, formData);
      toast.success("Sikeres frissítés");
      onSave();
      onClose();
    } catch (err) {
      toast.error("Hiba történt frissítés közben");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-xl space-y-4">
        <h2 className="text-xl font-semibold mb-2">Bejelentés módosítása</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div><strong>Cím:</strong> {initialData?.address}</div>
          <div><strong>Koordináták:</strong> {initialData?.lat}, {initialData?.lon}</div>
        </div>

        <div>
          <label className="block font-medium">Állapot</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded p-2" required>
            <option value="">Válassz állapot</option>
            <option value="k">Keresett</option>
            <option value="t">Talált</option>
            <option value="l">Látott</option>
            <option value="m">Mentett</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Szín</label>
          <select name="color" value={form.color} onChange={handleChange} className="w-full border rounded p-2" required>
            <option value="">Válassz szín</option>
            <option value="feher">Fehér</option>
            <option value="fekete">Fekete</option>
            <option value="barna">Barna</option>
            <option value="voros">Vörös</option>
            <option value="bezs">Bézs</option>
            <option value="szurke">Szürke</option>
            <option value="feketefeher">Fekete - fehér</option>
            <option value="feketefehervoros">Fekete - fehér - vörös</option>
            <option value="feketevoros">Fekete - vörös</option>
            <option value="vorosfeher">Vörös - fehér</option>
            <option value="szurkefeher">Szürke - fehér</option>
            <option value="barnafeher">Barna - fehér</option>
            <option value="barnabezs">Barna - bézs</option>
            <option value="egyeb">Egyéb</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Minta</label>
          <select name="pattern" value={form.pattern} onChange={handleChange} className="w-full border rounded p-2" required>
            <option value="">Válassz minta</option>
            <option value="cirmos">Cirmos</option>
            <option value="foltos">Foltos</option>
            <option value="egyszinu">Egyszínű</option>
            <option value="teknoctarka">Teknőctarka</option>
            <option value="kopasz">Kopasz</option>
            <option value="foka">Fóka</option>
            <option value="kaliko">Kalikó</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Egyéb ismertetőjel</label>
          <input
            type="text"
            name="other_identifying_marks"
            value={form.other_identifying_marks}
            onChange={handleChange}
            className="w-full border rounded p-2"
            
          />
        </div>
        
        <div>
          <label className="block font-medium">Egészségi állapot</label>
          <input
            type="text"
            name="health_status"
            value={form.health_status}
            onChange={handleChange}
            className="w-full border rounded p-2"
            
          />
        </div>
        
        <div>
          <label className="block font-medium">Chip szám</label>
          <input
            type="number"
            name="chip_number"
            value={form.chip_number}
            onChange={handleChange}
            className="w-full border rounded p-2"
            
          />
        </div>
        
        <div>
          <label className="block font-medium">Körülmények</label>
          <input
            type="text"
            name="circumstances"
            value={form.circumstances}
            onChange={handleChange}
            className="w-full border rounded p-2"
            
          />
        </div>
        
        <div>
          <label className="block font-medium">Példányok száma</label>
          <input
            type="number"
            name="number_of_individuals"
            value={form.number_of_individuals}
            onChange={handleChange}
            className="w-full border rounded p-2"
            
          />
        </div>
        
        <div>
          <label className="block font-medium">Eltűnés dátuma</label>
          <input
            type="date"
            name="disappearance_date"
            value={form.disappearance_date}
            onChange={handleChange}
            className="w-full border rounded p-2"
            
          />
        </div>
        
        <div>
          <label className="block font-medium">Fénykép (opcionális)</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            accept=".jpg,.jpeg,.png,.gif,.svg"
            className="w-full border rounded p-2"
          />
        </div>
        
        <div>
          <label className="block font-medium">Aktivitás</label>
          <select name="activity" value={form.activity} onChange={handleChange} className="w-full border rounded p-2" required>
            <option value="">Válassz aktivitás</option>
            <option value="1">Aktív</option>
            <option value="0">Inaktív</option>
          </select>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Mégse</button>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Mentés</button>
        </div>
      </form>
    </div>
  );
};

export default BejelentesMenhelyModal;
