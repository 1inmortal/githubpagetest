"""
Utilidades para Machine Learning del proyecto Python.

Este módulo contiene clases y funciones para operaciones básicas de ML.
"""

import logging
from typing import List, Dict, Any, Optional, Tuple, Union
import random
import math

logger = logging.getLogger(__name__)


class MLUtils:
    """
    Clase de utilidades para Machine Learning.
    
    Esta clase proporciona métodos básicos para operaciones de ML
    sin depender de librerías externas complejas.
    """
    
    def __init__(self):
        """Inicializar utilidades de ML."""
        self.models = {}
        self.training_history = []
        
        logger.info("MLUtils inicializado")
    
    def generate_sample_data(self, n_samples: int = 100, 
                           n_features: int = 3) -> Tuple[List[List[float]], List[float]]:
        """
        Generar datos de ejemplo para ML.
        
        Args:
            n_samples: Número de muestras a generar
            n_features: Número de características por muestra
            
        Returns:
            Tupla con (X, y) donde X son las características e y son las etiquetas
        """
        X = []
        y = []
        
        for _ in range(n_samples):
            # Generar características aleatorias
            features = [random.uniform(-1, 1) for _ in range(n_features)]
            X.append(features)
            
            # Generar etiqueta simple (suma de características + ruido)
            label = sum(features) + random.uniform(-0.1, 0.1)
            y.append(label)
        
        logger.info(f"Datos de ejemplo generados: {n_samples} muestras, {n_features} características")
        return X, y
    
    def train_linear_regression(self, X: List[List[float]], 
                               y: List[float], 
                               learning_rate: float = 0.01,
                               epochs: int = 100) -> Dict[str, Any]:
        """
        Entrenar regresión lineal simple usando descenso de gradiente.
        
        Args:
            X: Características de entrenamiento
            y: Etiquetas de entrenamiento
            learning_rate: Tasa de aprendizaje
            epochs: Número de épocas de entrenamiento
            
        Returns:
            Diccionario con el modelo entrenado y métricas
        """
        if not X or not y or len(X) != len(y):
            raise ValueError("X e y deben tener la misma longitud y no estar vacíos")
        
        n_features = len(X[0])
        n_samples = len(X)
        
        # Inicializar pesos aleatoriamente
        weights = [random.uniform(-0.1, 0.1) for _ in range(n_features)]
        bias = random.uniform(-0.1, 0.1)
        
        # Historial de entrenamiento
        history = []
        
        for epoch in range(epochs):
            # Forward pass
            predictions = []
            for features in X:
                pred = sum(w * f for w, f in zip(weights, features)) + bias
                predictions.append(pred)
            
            # Calcular pérdida (MSE)
            mse = sum((pred - actual) ** 2 for pred, actual in zip(predictions, y)) / n_samples
            
            # Backward pass (gradientes)
            dw = [0.0] * n_features
            db = 0.0
            
            for i in range(n_samples):
                error = predictions[i] - y[i]
                for j in range(n_features):
                    dw[j] += (2 * error * X[i][j]) / n_samples
                db += (2 * error) / n_samples
            
            # Actualizar pesos
            for j in range(n_features):
                weights[j] -= learning_rate * dw[j]
            bias -= learning_rate * db
            
            # Guardar métricas
            if epoch % 10 == 0:
                history.append({
                    'epoch': epoch,
                    'mse': mse,
                    'weights': weights.copy(),
                    'bias': bias
                })
        
        # Crear modelo entrenado
        model = {
            'type': 'linear_regression',
            'weights': weights,
            'bias': bias,
            'n_features': n_features,
            'training_history': history
        }
        
        self.models['linear_regression'] = model
        logger.info(f"Regresión lineal entrenada en {epochs} épocas. MSE final: {mse:.6f}")
        
        return model
    
    def predict_linear_regression(self, model: Dict[str, Any], 
                                X: List[List[float]]) -> List[float]:
        """
        Hacer predicciones usando modelo de regresión lineal entrenado.
        
        Args:
            model: Modelo entrenado
            X: Características para predicción
            
        Returns:
            Lista de predicciones
        """
        if model['type'] != 'linear_regression':
            raise ValueError("Modelo debe ser de tipo 'linear_regression'")
        
        weights = model['weights']
        bias = model['bias']
        
        predictions = []
        for features in X:
            if len(features) != len(weights):
                raise ValueError(f"Características deben tener {len(weights)} dimensiones")
            
            pred = sum(w * f for w, f in zip(weights, features)) + bias
            predictions.append(pred)
        
        return predictions
    
    def calculate_metrics(self, y_true: List[float], 
                         y_pred: List[float]) -> Dict[str, float]:
        """
        Calcular métricas de evaluación para regresión.
        
        Args:
            y_true: Valores reales
            y_pred: Valores predichos
            
        Returns:
            Diccionario con métricas calculadas
        """
        if len(y_true) != len(y_pred):
            raise ValueError("y_true e y_pred deben tener la misma longitud")
        
        n = len(y_true)
        
        # MSE (Mean Squared Error)
        mse = sum((true - pred) ** 2 for true, pred in zip(y_true, y_pred)) / n
        
        # RMSE (Root Mean Squared Error)
        rmse = math.sqrt(mse)
        
        # MAE (Mean Absolute Error)
        mae = sum(abs(true - pred) for true, pred in zip(y_true, y_pred)) / n
        
        # R² (Coefficient of Determination)
        y_mean = sum(y_true) / n
        ss_tot = sum((true - y_mean) ** 2 for true in y_true)
        ss_res = sum((true - pred) ** 2 for true, pred in zip(y_true, y_pred))
        r2 = 1 - (ss_res / ss_tot) if ss_tot != 0 else 0
        
        metrics = {
            'mse': mse,
            'rmse': rmse,
            'mae': mae,
            'r2': r2
        }
        
        logger.info(f"Métricas calculadas: MSE={mse:.6f}, RMSE={rmse:.6f}, R²={r2:.6f}")
        return metrics
    
    def cross_validation(self, X: List[List[float]], 
                        y: List[float], 
                        k_folds: int = 5) -> Dict[str, List[float]]:
        """
        Realizar validación cruzada k-fold.
        
        Args:
            X: Características
            y: Etiquetas
            k_folds: Número de folds
            
        Returns:
            Diccionario con métricas de cada fold
        """
        if len(X) != len(y):
            raise ValueError("X e y deben tener la misma longitud")
        
        n_samples = len(X)
        fold_size = n_samples // k_folds
        
        # Mezclar datos
        combined = list(zip(X, y))
        random.shuffle(combined)
        X_shuffled, y_shuffled = zip(*combined)
        
        fold_metrics = []
        
        for fold in range(k_folds):
            # Dividir en train y validation
            start_idx = fold * fold_size
            end_idx = start_idx + fold_size if fold < k_folds - 1 else n_samples
            
            X_val = X_shuffled[start_idx:end_idx]
            y_val = y_shuffled[start_idx:end_idx]
            
            X_train = X_shuffled[:start_idx] + X_shuffled[end_idx:]
            y_train = y_shuffled[:start_idx] + y_shuffled[end_idx:]
            
            # Entrenar modelo
            model = self.train_linear_regression(X_train, y_train, epochs=50)
            
            # Hacer predicciones
            y_pred = self.predict_linear_regression(model, X_val)
            
            # Calcular métricas
            metrics = self.calculate_metrics(y_val, y_pred)
            fold_metrics.append(metrics)
            
            logger.info(f"Fold {fold + 1}: MSE={metrics['mse']:.6f}, R²={metrics['r2']:.6f}")
        
        # Calcular métricas promedio
        avg_metrics = {}
        for metric in fold_metrics[0].keys():
            avg_metrics[f'avg_{metric}'] = sum(fold[metric] for fold in fold_metrics) / k_folds
        
        return {
            'fold_metrics': fold_metrics,
            'average_metrics': avg_metrics
        }
    
    def example_ml_operation(self) -> str:
        """
        Ejecutar operación de ML de ejemplo.
        
        Returns:
            Mensaje de confirmación de la operación
        """
        try:
            # Generar datos de ejemplo
            X, y = self.generate_sample_data(n_samples=200, n_features=2)
            
            # Dividir en train y test
            split_idx = int(0.8 * len(X))
            X_train, X_test = X[:split_idx], X[split_idx:]
            y_train, y_test = y[:split_idx], y[split_idx:]
            
            # Entrenar modelo
            model = self.train_linear_regression(X_train, y_train, epochs=100)
            
            # Hacer predicciones
            y_pred = self.predict_linear_regression(model, X_test)
            
            # Calcular métricas
            metrics = self.calculate_metrics(y_test, y_pred)
            
            # Validación cruzada
            cv_results = self.cross_validation(X_train, y_train, k_folds=3)
            
            result = f"Operación ML completada: {len(X)} muestras, MSE={metrics['mse']:.6f}, R²={metrics['r2']:.6f}"
            logger.info(result)
            
            return result
            
        except Exception as e:
            error_msg = f"Error en operación ML: {e}"
            logger.error(error_msg)
            return error_msg
    
    def get_model_info(self) -> Dict[str, Any]:
        """
        Obtener información de los modelos entrenados.
        
        Returns:
            Diccionario con información de los modelos
        """
        info = {
            'total_models': len(self.models),
            'model_types': list(self.models.keys()),
            'models': {}
        }
        
        for name, model in self.models.items():
            info['models'][name] = {
                'type': model['type'],
                'n_features': model.get('n_features', 'N/A'),
                'training_epochs': len(model.get('training_history', [])),
                'final_mse': model.get('training_history', [{}])[-1].get('mse', 'N/A') if model.get('training_history') else 'N/A'
            }
        
        return info


if __name__ == "__main__":
    # Ejemplo de uso
    import logging
    logging.basicConfig(level=logging.INFO)
    
    ml_utils = MLUtils()
    result = ml_utils.example_ml_operation()
    print(result)
    
    info = ml_utils.get_model_info()
    print(f"Información del modelo: {info}")
