# Upload PDF to Cloudinary

Upload PDF file to Cloudinary and get its url as .png image _(Due to Cloudinary API limitation, PDF files are converted to .png images)_.

## Endpoints

```http
POST /
```

**Body:** _form-data_

| Parameter | Type   | Description                           |
| :-------- | :----- | :------------------------------------ |
| `pdf`     | `File` | **Required**. Your PDF file to upload |

```http
POST /buffer
```

**Body:** _Buffer_

## Responses

```json
{
  "url": "https://res.cloudinary.com/<cloud_name>/image/upload/v1547241234/<public_id>.png"
}
```
