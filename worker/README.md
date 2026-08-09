# Captura de leads con D1

El formulario de lista de espera funciona **sin nada de esto**: si no hay
endpoint configurado, abre el correo del usuario con los datos ya escritos. Esto
es el paso siguiente, para que los leads caigan en una base en vez de en un
buzón.

No está activado a propósito: enchufarlo cambia el Worker de "solo assets" a
"assets + código", y eso no debe pasar por accidente en un despliegue.

## Activarlo (4 pasos)

1. **Crear la base:**

   ```bash
   npx wrangler d1 create bixio-leads
   ```

   Devuelve un `database_id`. Cópialo.

2. **Aplicar el esquema:**

   ```bash
   npx wrangler d1 execute bixio-leads --remote --file worker/schema.sql
   ```

3. **Añadir a `wrangler.jsonc`** el punto de entrada y el binding:

   ```jsonc
   "main": "worker/leads.ts",
   "assets": {
     "directory": "./out",
     "not_found_handling": "404-page",
     "binding": "ASSETS"          // <- necesario para que el Worker sirva el sitio
   },
   "vars": { "ALLOWED_ORIGIN": "https://bixiotag.com" },
   "d1_databases": [
     { "binding": "LEADS", "database_name": "bixio-leads", "database_id": "EL_ID_DEL_PASO_1" }
   ]
   ```

4. **Definir la variable del front** en el proyecto de Cloudflare:

   ```
   NEXT_PUBLIC_LEADS_ENDPOINT = https://bixiotag.com/api/leads
   ```

   Se lee en el build, así que hay que redesplegar después de añadirla.

## Consultar los leads

```bash
# Todos, los más recientes primero
npx wrangler d1 execute bixio-leads --remote \
  --command "SELECT created_at, email, segment, origin FROM leads ORDER BY created_at DESC LIMIT 50"

# Solo los de partner: el pipeline de LOI
npx wrangler d1 execute bixio-leads --remote \
  --command "SELECT created_at, email, phone, boxes FROM leads WHERE partner_lead = 1 ORDER BY created_at DESC"

# La mezcla real de la demanda, que es la brújula del brief
npx wrangler d1 execute bixio-leads --remote \
  --command "SELECT segment, COUNT(*) AS total FROM leads GROUP BY segment ORDER BY total DESC"
```

## Notas

- El email es la clave primaria: si alguien se apunta dos veces se actualiza su
  fila en vez de duplicarla.
- No se guarda IP ni user-agent. Con email y segmento basta para el propósito, y
  cuanto menos dato personal se almacene, menos superficie de RGPD.
- Antes de publicar el formulario hay que enlazar la política de privacidad
  completada: se está recogiendo un dato personal con una finalidad concreta.
