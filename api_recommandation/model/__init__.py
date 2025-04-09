"""Package contenant la logique de construction et d'entraînement du modèle de recommandation."""

from .model_utils import build_model
from .train import train_model

__all__ = ['build_model', 'train_model']