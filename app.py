from apktouyangtze import app
import uvicorn

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8091, reload=True)

# uvicorn apktouyangtze:app --host 127.0.0.1 --port 8091 --reload