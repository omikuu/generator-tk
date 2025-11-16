"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {
  // 入力された文字列を管理する state
  const [inputText, setInputText] = useState("");
  // 生成結果を表示する state
  const [outputText, setOutputText] = useState("");
  // コピー完了を一時表示する state
  const [copied, setCopied] = useState(false);

  // フォーム送信（またはボタン押下）で生成処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 例: 1文字ずつ区切って各文字に「！」を付与
    const generated = inputText
      .split("")
      .map((c) => c + "！")
      .join("");
    setOutputText(generated);
  };

  // 生成結果をクリップボードにコピー
  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // コピー失敗時は簡易フォールバック（選択＋alert）
      alert("コピーに失敗しました。手動で選択してください。");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center bg-zinc-50 dark:bg-black sm:items-start px-6 py-40 gap-6">
        <Typography
          variant="h3"
          component="div"
          className="self-center sm:self-start mb-2 text-center sm:text-left"
        >
          <span className="dotgothic title">
            <span className="title-part1">たかちゃん構文 </span>
            <span className="title-part2">
              ジェネレーター
              <img
                src="/alcohol_highball_mug.png"
                alt="ビール"
                className="inline-block w-11 h-11 ml-2 align-middle"
              />
            </span>
          </span>
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          className="w-full max-w-md my-2"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 10px 20px rgba(0,0,0,0.22)",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="edit" className="pl-2">
            <EditIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            className="pr-2"
            placeholder="ここに入力してください"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            inputProps={{ "aria-label": "input text", maxLength: 200 }}
          />
        </Paper>

        <Button
          type="submit"
          variant="contained"
          className="mt-2 self-center sm:self-start"
          onClick={handleSubmit}
          sx={{
            boxShadow: "0 10px 20px rgba(0,0,0,0.22)",
            backgroundColor: "#fafafa",
            color: "#111827",
          }}
        >
          GENERATE
        </Button>

        <Paper
          component="div"
          className="w-full max-w-md my-2 p-4"
          sx={{
            boxShadow: "0 10px 20px rgba(0,0,0,0.22)",
            backgroundColor: "#e4e5a4ff",
            minHeight: "100px",
          }}
        >
          <Typography variant="body1" component="div">
            {outputText || "ここに生成されたたかちゃん構文が表示されます。"}
          </Typography>
        </Paper>
        <div className="w-full max-w-md my-2 flex items-center justify-start gap-3">
          <Button
            type="button"
            variant="contained"
            onClick={handleCopy}
            disabled={!outputText}
            className="mt-2 self-center sm:self-start"
            sx={{
              boxShadow: "0 10px 20px rgba(0,0,0,0.22)",
              backgroundColor: "#fafafa",
              color: "#111827",
            }}
          >
            COPY
          </Button>
          {copied && <span className="text-sm text-gray-700">Copied!</span>}
        </div>
      </main>
    </div>
  );
}
