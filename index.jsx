import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PenjanaPromptVeo3() {
  const [suasana, setSuasana] = useState("");
  const [gaya, setGaya] = useState("");
  const [pencahayaan, setPencahayaan] = useState("");
  const [prompt, setPrompt] = useState("");

  const janaPrompt = () => {
    const hasil = `Video bergaya sinematik yang memaparkan suasana ${suasana}, dengan gaya visual ${gaya}, dan pencahayaan ${pencahayaan}. Gunakan komposisi menarik dan naratif visual yang kuat. Bahasa video: Bahasa Melayu.`;
    setPrompt(hasil);
  };

  const muatTurunFail = () => {
    const blob = new Blob([prompt], { type: "text/plain;charset=utf-8" });
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
            <Input
              placeholder="Contoh: pagi di kampung, malam hari raya..."
              value={suasana}
              onChange={(e) => setSuasana(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Gaya Visual</label>
            <Input
              placeholder="Contoh: sinematik, dokumentari, retro..."
              value={gaya}
              onChange={(e) => setGaya(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Pencahayaan</label>
            <Input
              placeholder="Contoh: cahaya keemasan pagi, gelap dan dramatik..."
              value={pencahayaan}
              onChange={(e) => setPencahayaan(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={janaPrompt}>Jana Prompt</Button>

          <div>
            <label className="block mb-1 font-medium">Prompt Akhir</label>
            <Textarea value={prompt} rows={6} readOnly />
          </div>

          <Button className="w-full" onClick={muatTurunFail}>Muat Turun Sebagai Fail</Button>
        </CardContent>
      </Card>
    </div>
  );
}
