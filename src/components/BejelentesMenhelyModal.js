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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isShelterPage
        ? `/api/update-sheltered-cat/${initialData.cat_id}`
        : `/api/update-report/${initialData.report_id}`;
  
      const formData = new FormData();
      for (let key in form) {
        if (form[key] !== null && form[key] !== undefined) {
          formData.append(key, form[key]);
        }
      }
  
      const response = await myAxios.put(endpoint, formData);
  
      // Ha a válaszban nincs `report`, akkor dobunk hibát
      if (!response?.data?.report) {
        throw new Error("Hiányzik a frissített adat a válaszból");
      }
  
      // Csak akkor hívunk vissza és zárjuk be a modalt, ha minden oké
      onSave(response.data.report);
      toast.success("Sikeres frissítés");
      onClose();
      
    } catch (err) {
      console.error("Hiba:", err);
      toast.error("Hiba történt frissítés közben");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-xl space-y-4">
        <h2 className="text-xl font-semibold">Bejelentés módosítása</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div><strong>Cím:</strong> {initialData?.address}</div>
          <div><strong>Koordináták:</strong> {initialData?.lat}, {initialData?.lon}</div>
          <div><strong>Bejelentés ID:</strong> {initialData?.report_id || "-"}</div>
        </div>

        <div>
          <label className="block font-medium">Állapot</label>
          <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded p-2" required>
            <option value="">Válassz állapotot</option>
            <option value="k">Keresett</option>
            <option value="t">Talált</option>
            <option value="l">Látott</option>
            <option value="m">Mentett</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Szín</label>
          <select name="color" value={form.color} onChange={handleChange} className="w-full border rounded p-2" required>
            <option value="">Válassz színt</option>
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
            <option value="">Válassz mintát</option>
            <option value="cirmos">Cirmos</option>
            <option value="foltos">Foltos</option>
            <option value="egyszinu">Egyszínű</option>
            <option value="teknoctarka">Teknőctarka</option>
            <option value="kopasz">Kopasz</option>
            <option value="foka">Fóka</option>
            <option value="kaliko">Kalikó</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="other_identifying_marks" value={form.other_identifying_marks} onChange={handleChange} placeholder="Egyéb ismertetőjel" className="border p-2 rounded w-full" />
          <input name="health_status" value={form.health_status} onChange={handleChange} placeholder="Egészségi állapot" className="border p-2 rounded w-full" />
          <input type="number" name="chip_number" value={form.chip_number} onChange={handleChange} placeholder="Chip szám" className="border p-2 rounded w-full" />
          <input name="circumstances" value={form.circumstances} onChange={handleChange} placeholder="Körülmények" className="border p-2 rounded w-full" />
          <input type="number" min={1} name="number_of_individuals" value={form.number_of_individuals} onChange={handleChange} placeholder="Példányok száma" className="border p-2 rounded w-full" />
          <input type="date" name="disappearance_date" value={form.disappearance_date} onChange={handleChange} className="border p-2 rounded w-full" />
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
