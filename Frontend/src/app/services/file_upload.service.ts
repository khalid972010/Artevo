import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private containerClient: ContainerClient;

  constructor() {
    const blobServiceClient = new BlobServiceClient("https://artevoproj.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-04-30T20:17:08Z&st=2024-04-09T12:17:08Z&spr=https,http&sig=U5fQejF78%2FDYWtOjqVMjulkc8vqYy4VrKubiG53rjBQ%3D");
    this.containerClient = blobServiceClient.getContainerClient('test'); // Replace with your container name
  }

   async uploadAndSaveToDatabase(file: File): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;
    const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);

    // Read the file using FileReader
    const fileContent = await this.readFile(file);

    // Upload the file content to Azure Blob Storage
    await blockBlobClient.uploadData(fileContent, { blockSize: 4 * 1024 * 1024, concurrency: 20 });

    const imageUrl = blockBlobClient.url;

    return imageUrl;
  }

  private async readFile(file: File): Promise<ArrayBuffer> {
    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file.'));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
}
