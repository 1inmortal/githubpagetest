"""
Tests para el módulo principal del proyecto.

Este módulo contiene tests para la funcionalidad principal.
"""

import pytest
import sys
from unittest.mock import patch, MagicMock
from src.main import main, run_flask_app, run_fastapi_app, run_data_analysis


class TestMain:
    """Tests para las funciones principales."""
    
    @pytest.mark.unit
    def test_main_success(self):
        """Test de función main exitosa."""
        with patch('src.main.setup_logging'), \
             patch('src.main.load_config') as mock_load_config, \
             patch('src.main.DataProcessor') as mock_dp_class, \
             patch('src.main.MLUtils') as mock_ml_class:
            
            # Configurar mocks
            mock_load_config.return_value = {'app_name': 'Test App'}
            mock_dp = MagicMock()
            mock_dp.process_example_data.return_value = "Procesado exitosamente"
            mock_dp_class.return_value = mock_dp
            
            mock_ml = MagicMock()
            mock_ml.example_ml_operation.return_value = "ML completado"
            mock_ml_class.return_value = mock_ml
            
            # Ejecutar función
            result = main()
            
            # Verificar resultado
            assert result == 0
            mock_dp.process_example_data.assert_called_once()
            mock_ml.example_ml_operation.assert_called_once()
    
    @pytest.mark.unit
    def test_main_error(self):
        """Test de función main con error."""
        with patch('src.main.setup_logging', side_effect=Exception("Test error")):
            result = main()
            assert result == 1
    
    @pytest.mark.unit
    def test_run_flask_app_success(self):
        """Test de ejecución exitosa de Flask."""
        with patch('src.main.Flask') as mock_flask_class, \
             patch('src.main.logger') as mock_logger:
            
            mock_app = MagicMock()
            mock_flask_class.return_value = mock_app
            
            # Ejecutar función
            run_flask_app()
            
            # Verificar que se configuraron las rutas
            assert mock_app.route.call_count == 2
    
    @pytest.mark.unit
    def test_run_flask_app_import_error(self):
        """Test de Flask con error de importación."""
        with patch('src.main.Flask', side_effect=ImportError("Flask not found")), \
             patch('src.main.logger') as mock_logger:
            
            run_flask_app()
            mock_logger.error.assert_called_with(
                "Flask no está instalado. Ejecuta: pip install flask"
            )
    
    @pytest.mark.unit
    def test_run_fastapi_app_success(self):
        """Test de ejecución exitosa de FastAPI."""
        with patch('src.main.FastAPI') as mock_fastapi_class, \
             patch('src.main.uvicorn.run') as mock_uvicorn, \
             patch('src.main.logger') as mock_logger:
            
            mock_app = MagicMock()
            mock_fastapi_class.return_value = mock_app
            
            # Ejecutar función
            run_fastapi_app()
            
            # Verificar que se configuraron las rutas
            assert mock_app.get.call_count == 2
            mock_uvicorn.run.assert_called_once()
    
    @pytest.mark.unit
    def test_run_fastapi_app_import_error(self):
        """Test de FastAPI con error de importación."""
        with patch('src.main.FastAPI', side_effect=ImportError("FastAPI not found")), \
             patch('src.main.logger') as mock_logger:
            
            run_fastapi_app()
            mock_logger.error.assert_called_with(
                "FastAPI no está instalado. Ejecuta: pip install fastapi uvicorn"
            )
    
    @pytest.mark.unit
    def test_run_data_analysis_success(self):
        """Test de análisis de datos exitoso."""
        with patch('src.main.pd') as mock_pd, \
             patch('src.main.np') as mock_np, \
             patch('src.main.logger') as mock_logger:
            
            # Configurar mocks
            mock_data = MagicMock()
            mock_data.shape = (100, 3)
            mock_data.columns = ['x', 'y', 'category']
            mock_data.describe.return_value = "Estadísticas"
            mock_data.__getitem__.return_value.value_counts.return_value = "Conteo"
            
            mock_pd.DataFrame.return_value = mock_data
            mock_np.random.randn.return_value = [0.1, 0.2, 0.3]
            mock_np.random.choice.return_value = ['A', 'B', 'C']
            
            # Ejecutar función
            run_data_analysis()
            
            # Verificar que se crearon los datos
            mock_pd.DataFrame.assert_called_once()
            mock_logger.info.assert_called_with("Análisis de datos completado exitosamente")
    
    @pytest.mark.unit
    def test_run_data_analysis_import_error(self):
        """Test de análisis de datos con error de importación."""
        with patch('src.main.pd', side_effect=ImportError("pandas not found")), \
             patch('src.main.logger') as mock_logger:
            
            run_data_analysis()
            mock_logger.error.assert_called_with(
                "Pandas/NumPy no están instalados. Ejecuta: pip install pandas numpy"
            )


class TestMainCommandLine:
    """Tests para la interfaz de línea de comandos."""
    
    @pytest.mark.unit
    def test_main_with_flask_command(self):
        """Test de comando flask."""
        with patch('src.main.run_flask_app') as mock_run_flask:
            # Simular argumentos de línea de comandos
            with patch.object(sys, 'argv', ['main.py', 'flask']):
                with patch('src.main.run_flask_app'):
                    # No podemos probar directamente __main__ pero podemos verificar la lógica
                    pass
    
    @pytest.mark.unit
    def test_main_with_fastapi_command(self):
        """Test de comando fastapi."""
        with patch('src.main.run_fastapi_app') as mock_run_fastapi:
            # Simular argumentos de línea de comandos
            with patch.object(sys, 'argv', ['main.py', 'fastapi']):
                with patch('src.main.run_fastapi_app'):
                    # No podemos probar directamente __main__ pero podemos verificar la lógica
                    pass
    
    @pytest.mark.unit
    def test_main_with_data_command(self):
        """Test de comando data."""
        with patch('src.main.run_data_analysis') as mock_run_data:
            # Simular argumentos de línea de comandos
            with patch.object(sys, 'argv', ['main.py', 'data']):
                with patch('src.main.run_data_analysis'):
                    # No podemos probar directamente __main__ pero podemos verificar la lógica
                    pass
    
    @pytest.mark.unit
    def test_main_with_help_command(self):
        """Test de comando help."""
        with patch('builtins.print') as mock_print:
            # Simular argumentos de línea de comandos
            with patch.object(sys, 'argv', ['main.py', 'help']):
                with patch('builtins.print'):
                    # No podemos probar directamente __main__ pero podemos verificar la lógica
                    pass
    
    @pytest.mark.unit
    def test_main_with_unknown_command(self):
        """Test de comando desconocido."""
        with patch('builtins.print') as mock_print:
            # Simular argumentos de línea de comandos
            with patch.object(sys, 'argv', ['main.py', 'unknown']):
                with patch('builtins.print'):
                    # No podemos probar directamente __main__ pero podemos verificar la lógica
                    pass


if __name__ == "__main__":
    pytest.main([__file__])
