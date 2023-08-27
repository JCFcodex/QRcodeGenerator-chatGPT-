const generateButton = document.getElementById("generate");

generateButton.addEventListener("click", function () {
  const text = document.getElementById("text").value.trim();
  const qrcodeDiv = document.getElementById("qrcode");

  if (text === "") {
    alert("Please enter a text or URL.");
    return;
  }

  // Generate the QR code
  const qr = new QRious({
    value: text,
    size: 128,
  });

  // Get the QR code as a data URL
  const qrcodeDataURL = qr.toDataURL("image/png");

  // Create an image element to display the QR code
  const qrcodeImage = document.createElement("img");
  qrcodeImage.src = qrcodeDataURL;

  // Clear any previous QR code images
  qrcodeDiv.innerHTML = "";

  // Append the new QR code image to the div
  qrcodeDiv.appendChild(qrcodeImage);

  // Create a Blob from the data URL
  const blob = dataURItoBlob(qrcodeDataURL);

  // Create an object URL for the Blob
  const blobUrl = URL.createObjectURL(blob);

  // Check if the download button already exists
  const existingDownloadButton = document.getElementById("download");
  if (!existingDownloadButton) {
    // Create and show the download button
    createDownloadButton(blobUrl);
  } else {
    // Update the download button's href
    existingDownloadButton.href = blobUrl;
  }
});

// Function to convert data URI to Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

function createDownloadButton(blobUrl) {
  const downloadButton = document.createElement("a");
  downloadButton.id = "download"; // Set the id for future reference
  downloadButton.href = blobUrl;
  downloadButton.download = "qrcode.png";
  downloadButton.textContent = "Download QR Code";

  // Append the download button to the container
  document.querySelector(".container").appendChild(downloadButton);
}
