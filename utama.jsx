import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import jsPDF from "jspdf";

export default function PenjanaPromptVeo3() {
  const [subjek, setSubjek] = useState("");
  const [aksi, setAksi] = useState("");
  const [emosi, setEmosi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [masa, setMasa] = useState("");
  const [cuaca, setCuaca] = useState("");
  const [gaya, setGaya] = useState("");
  const [pencahayaan, setPencahayaan] = useState("");
  const [muzik, setMuzik] = useState("");
  const [dialog, setDialog] = useState("");
  const [sudut, setSudut] = useState("");
  const [kualiti, setKualiti] = useState("");
  const [kesanBunyi, setKesanBunyi] = useState("");
  const [naratif, setNaratif] = useState("");
  const [sejarah, setSejarah] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [promptEn, setPromptEn] = useState("");

  useEffect(() => {
    const simpan = localStorage.getItem("sejarahPrompt");
    if (simpan) setSejarah(JSON.parse(simpan));
  }, []);

  useEffect(() => {
    localStorage.setItem("sejarahPrompt", JSON.stringify(sejarah));
  }, [sejarah]);

  const janaPrompt = () => {
    const bm = `Video bergaya sinematik memaparkan ${subjek} sedang ${aksi} dengan ekspresi ${emosi}, di ${lokasi}, pada waktu ${masa}, dalam cuaca ${cuaca}. Gaya visual ${gaya}, pencahayaan ${pencahayaan}, muzik latar ${muzik}, dialog ${dialog}, kesan bunyi ${kesanBunyi}, naratif ${naratif}, sudut kamera ${sudut}, dan kualiti video ${kualiti}. Video ini dalam Bahasa Melayu.`;
    const en = `A cinematic video featuring ${subjek} who is ${aksi} with a ${emosi} expression, at ${lokasi}, during ${masa}, under ${cuaca} conditions. Visual style is ${gaya}, lighting is ${pencahayaan}, background music: ${muzik}, dialog: ${dialog}, sound effects: ${kesanBunyi}, narration: ${naratif}, camera angle: ${sudut}, and video quality: ${kualiti}. Video is in Malay.`;
    setPrompt(bm);
    setPromptEn(en);
    setSejarah(prev => [...prev, { bm, en }]);
  };

  const muatTurunFail = () => {
    const blob = new Blob([prompt + "\n\n" + promptEn], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "prompt-veo3.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const muatTurunPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Prompt Bahasa Melayu:", 10, 10);
    doc.text(doc.splitTextToSize(prompt, 180), 10, 20);
    doc.text("Prompt Bahasa Inggeris:", 10, doc.autoTableEndPosY ? doc.autoTableEndPosY() + 10 : 60);
    doc.text(doc.splitTextToSize(promptEn, 180), 10, doc.autoTableEndPosY ? doc.autoTableEndPosY() + 20 : 70);
    doc.save("prompt-veo3.pdf");
  };

  const salinKeClipboard = (teks) => {
    navigator.clipboard.writeText(teks);
    alert("Prompt telah disalin ke papan klip!");
  };

  const kosongkanSejarah = () => {
    if (confirm("Anda pasti mahu mengosongkan sejarah prompt?")) {
      setSejarah([]);
      localStorage.removeItem("sejarahPrompt");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Penjana Prompt Veo 3</h1>

      <Card>
        <CardContent className="space-y-4 p-4">
          {/* Pilihan dan dropdown seperti sebelum ini... */}

          <Button className="w-full" onClick={janaPrompt}>Jana Prompt</Button>

          <div>
            <label className="block mb-1 font-medium">Prompt Bahasa Melayu</label>
            <Textarea value={prompt} rows={4} readOnly />
            <Button className="mt-2" onClick={() => salinKeClipboard(prompt)}>Salin Prompt BM</Button>
          </div>

          <div>
            <label className="block mb-1 font-medium">Prompt Bahasa Inggeris</label>
            <Textarea value={promptEn} rows={4} readOnly />
            <Button className="mt-2" onClick={() => salinKeClipboard(promptEn)}>Salin Prompt EN</Button>
          </div>

          <div className="flex gap-2">
            <Button className="w-full" onClick={muatTurunFail}>Muat Turun Fail Teks</Button>
            <Button className="w-full" onClick={muatTurunPDF}>Muat Turun PDF</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Sejarah Prompt Sebelumnya</h2>
            <Button variant="destructive" onClick={kosongkanSejarah}>Kosongkan Sejarah</Button>
          </div>
          {sejarah.length === 0 ? <p>Tiada prompt dijana lagi.</p> : (
            <ul className="space-y-2 list-disc list-inside">
              {sejarah.map((item, index) => (
                <li key={index} className="text-sm">
                  <strong>BM:</strong> {item.bm}<br />
                  <strong>EN:</strong> {item.en}<br />
                  <Button className="mt-1" onClick={() => salinKeClipboard(item.bm + "\n\n" + item.en)}>Salin Kedua-dua</Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
