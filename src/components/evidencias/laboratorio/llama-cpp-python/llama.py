from llama_cpp import Llama

llm = Llama(
    model_path="C:\\Users\\jarma\\Models\\Llama4-Maverick\\model.gguf",
    n_ctx=4096,
    n_threads=8,  # ajusta según tu CPU
    n_gpu_layers=40,  # ajusta si tienes GPU
    verbose=True
)

output = llm("¿Cómo implementar una estrategia de ciberseguridad basada en ISO 27001 para continuidad operativa?")
print(output['choices'][0]['text'])
