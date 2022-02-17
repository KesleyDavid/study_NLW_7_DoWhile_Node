// hierarquia da node_modules
// Insert field type in express to response middleware
declare namespace Express {
  export interface Request {
    user_id: string;
  }
}