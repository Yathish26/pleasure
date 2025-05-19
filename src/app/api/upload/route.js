import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('image');

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name}`;

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  // ✅ Ensure the folder exists
  if (!fs.existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);

  return new Response(JSON.stringify({ success: true, fileName }), { status: 200 });
}
