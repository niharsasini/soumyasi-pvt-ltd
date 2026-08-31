# TODO: wire up to Cloudinary / S3 using CLOUDINARY_* settings

def upload_file(file_bytes: bytes, filename: str, folder: str = "uploads") -> str:
    """Upload a file to cloud storage and return its public URL"""
    raise NotImplementedError("Configure a storage provider (Cloudinary/S3) here")

def delete_file(file_url: str) -> bool:
    """Delete a file from cloud storage by its URL"""
    raise NotImplementedError("Configure a storage provider (Cloudinary/S3) here")
