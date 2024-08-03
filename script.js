function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      const size = parseInt(document.getElementById("canvasSize").value);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = size;
      canvas.height = size;

      // キャンバスを白い背景で塗りつぶす
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, size, size);

      // 画像を中央に配置するための位置を計算
      const x = (size - img.width) / 2;
      const y = (size - img.height) / 2;

      // キャンバスに画像を描画
      ctx.drawImage(img, x, y);

      // キャンバスの内容をプレビュー画像のソースとして設定
      const output = document.getElementById("preview");
      output.src = canvas.toDataURL();
      output.style.width = size + "px";
      output.style.height = size + "px";

      // 画像のサイズを表示
      const dimensionsElement = document.getElementById("imageDimensions");
      dimensionsElement.textContent = `画像サイズ: ${img.width} x ${img.height} px`;

      // ダウンロードボタンを有効にする
      const downloadButton = document.getElementById("downloadButton");
      downloadButton.disabled = false;
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function downloadImage() {
  const img = document.getElementById("preview");
  const link = document.createElement("a");
  link.download =
    "resized-" + document.getElementById("fileInput").files[0].name;
  link.href = img.src; // プレビュー画像のソースを直接使用
  link.click();
}
