from llama_cpp import Llama

llm = Llama(
    model_path="C:\\Users\\jarma\\Models\\Llama4-Maverick\\model.gguf",  # Cambia esta ruta si tu modelo está en otro lado
    n_ctx=4096,
    n_threads=8,
    n_gpu_layers=40,  # Ajusta según tu GPU o usa 0 si solo tienes CPU
    verbose=True
)

# Prueba inicial
response = llm("¿Qué estrategias recomienda ISO 27001 para continuidad operativa en empresas medianas?")
print(response['choices'][0]['text'])
