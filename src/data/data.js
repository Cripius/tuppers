const resourceType = "Slot"; // <-- cambiar según el recurso fhir que queremos hacer (Patient, Observation...)
const fhirPath = "../../../fhir/"; //dirección hasta llegar a fhir
const extension = ".fhir.json"

const fs = require("fs"); //módulo que sirve para leer la info de una carpeta externa
path = require("path");
const resourceTypePath = path.join(__dirname, fhirPath, resourceType);

const resourceData = [];
try {
    const files = fs.readdirSync(resourceTypePath);
    for (const file of files) {
        if (file.startsWith(resourceType) && file.endsWith(extension)) {
            const resourcePath = path.join(resourceTypePath, file);
            const resource = require(resourcePath);
            resourceData.push(resource);
        }
    }
    console.log (
        `Data: Recurso ${resourceType}: ${resourceData.length} recursos cargados `
    );
} catch (error){
    console.error("Data: Error al cargar los recursos", error);
}
module.exports = resourceData;
