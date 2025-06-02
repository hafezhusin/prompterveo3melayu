import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PenjanaPromptVeo3() {
  const [suasana, setSuasana] = useState("");
  const [gaya, setGaya] = useState("");
  const [pencahayaan, setPencahayaan] = useState("");
  const [prompt, setPrompt] = useState("");
  const [promptEn, setPromptEn] = useState("");

  const janaPrompt = () => {
    const hasilBm = `Video bergaya sinematik yang memaparkan suasana ${suasana}, dengan gaya visual ${gaya}, dan pencahayaan ${pencahayaan}. Gunakan komposisi menarik dan naratif visual yang kuat. Bahasa video: Bahasa Melayu.`;
    const hasilEn = `A cinematic-style video portraying a scene of ${suasana}, with ${gaya} visual style and ${pencahayaan} lighting. Use compelling composition and strong visual narrative. Language: Malay.`;
    setPrompt(hasilBm);
    setPromptEn(hasilEn);
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

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Penjana Prompt Veo 3</h1>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div>
            <label className="block mb-1 font-medium">Suasana</label>
            <Select onValueChange={setSuasana}>
              <SelectTrigger><SelectValue placeholder="Pilih suasana" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pagi di kampung">Pagi di kampung</SelectItem>
                <SelectItem value="malam hari raya">Malam Hari Raya</SelectItem>
                <SelectItem value="hujan lebat di bandar">Hujan lebat di bandar</SelectItem>
                <SelectItem value="senja di sawah padi">Senja di sawah padi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Gaya Visual</label>
            <Select onValueChange={setGaya}>
              <SelectTrigger><SelectValue placeholder="Pilih gaya visual" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sinematik">Sinematik</SelectItem>
                <SelectItem value="dokumentari">Dokumentari</SelectItem>
                <SelectItem value="retro klasik">Retro Klasik</SelectItem>
                <SelectItem value="hyper-realistik">Hyper-realistik</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Pencahayaan</label>
            <Select onValueChange={setPencahayaan}>
              <SelectTrigger><SelectValue placeholder="Pilih pencahayaan" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cahaya keemasan pagi">Cahaya keemasan pagi</SelectItem>
                <SelectItem value="gelap dan dramatik">Gelap dan dramatik</SelectItem>
                <SelectItem value="semula jadi lembut">Semula jadi lembut</SelectItem>
                <SelectItem value="bercahaya neon malam">Bercahaya neon malam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={janaPrompt}>Jana Prompt</Button>

          <div>
            <label className="block mb-1 font-medium">Prompt Bahasa Melayu</label>
            <Textarea value={prompt} rows={4} readOnly />
          </div>

          <div>
            <label className="block mb-1 font-medium">Prompt Bahasa Inggeris</label>
            <Textarea value={promptEn} rows={4} readOnly />
          </div>

          <Button className="w-full" onClick={muatTurunFail}>Muat Turun Sebagai Fail</Button>
        </CardContent>
      </Card>
    </div>
  );
}
