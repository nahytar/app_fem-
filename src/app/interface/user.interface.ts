export interface User {
  userid?: string;
  name?: string;
  photoUrl?: string;
  phone?: string;
  mail?: string;
  latitud?: string;
  longitud?: string;
  agenda?: {
    nombre: string,
    contacto: string
  };
}
