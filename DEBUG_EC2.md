# Debugging 502 Error on EC2

Since you're running this on an EC2 instance, you need to check the logs on the **remote server**, not your local machine.

## Step 1: SSH into your EC2 instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

## Step 2: Navigate to the project directory

```bash
cd /home/ubuntu/cloudflaretestproject
```

## Step 3: Check if containers are running

```bash
docker-compose ps
```

You should see 3 services: `backend`, `frontend`, and `tunnel` all with status "Up".

## Step 4: Check frontend logs

```bash
docker-compose logs frontend --tail=50
```

Look for:

- ✅ `VITE v7.x.x ready in XXX ms`
- ✅ `➜  Local:   http://localhost:5173/`
- ✅ `➜  Network: http://0.0.0.0:5173/`

If you see errors, share them with me.

## Step 5: Check tunnel logs

```bash
docker-compose logs tunnel --tail=30
```

Look for the Cloudflare URL like:

- `https://random-name.trycloudflare.com`

## Step 6: Test frontend locally on EC2

```bash
curl http://localhost:5173
```

This should return HTML (the React app). If it returns an error, the frontend isn't running properly.

## Step 7: Test from tunnel container

```bash
docker-compose exec tunnel wget -O- http://frontend:5173
```

This tests if the tunnel can reach the frontend from inside Docker's network.

---

## Common Issues

### Issue: Frontend not binding to 0.0.0.0

**Solution**: Already fixed in `vite.config.js` - make sure you rebuilt with `docker-compose up --build`

### Issue: Tunnel starting before frontend is ready

**Solution**: Already added `depends_on` in `docker-compose.yml` - make sure you restarted

### Issue: Port conflicts on EC2

**Solution**: Check if another service is using port 5173:

```bash
sudo netstat -tulpn | grep 5173
```

---

Please run these commands on your EC2 instance and share the output so I can help you fix the issue.
