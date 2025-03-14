
const { Upload } = require("@aws-sdk/lib-storage");
const multer = require("multer");
const s3 = require("../config/s3");

// Configuración de Multer (subida de archivos en memoria)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Controlador para subir archivos
const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    const fileName = `${Date.now()}_${req.file.originalname}`;

    try {
        const uploadParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        };

        const upload = new Upload({
            client: s3,
            params: uploadParams
        });

        const result = await upload.done(); // Espera a que termine la carga

        res.json({
            message: "Archivo subido con éxito",
            url: result.Location // URL del archivo en S3
        });
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        res.status(500).json({ error: "Error al subir el archivo" });
    }
};

module.exports = { upload, uploadFile };
