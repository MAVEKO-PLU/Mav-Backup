const fastify = require('fastify')();
const axios = require('axios');

fastify.register(require('fastify-multipart'));

fastify.post('/upload', async (request, reply) => {
  const files = request.raw.files;
  
  if (!files || !files.file) {
    reply.code(400).send({ error: 'No file uploaded' });
    return;
  }

  const file = files.file;
  const data = await file.toBuffer();

  try {
    // Send the Excel file to the API endpoint
    const response = await axios.post('https://your-api-endpoint.com/api/process-excel', data, {
      headers: {
        'Content-Type': 'application/vnd.ms-excel',
      },
    });

    reply.send({ message: 'File uploaded successfully' });
  } catch (error) {
    reply.code(500).send({ error: 'Failed to upload file' });
  }
});

fastify.listen(3000, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Server is running on http://localhost:3000');
});
