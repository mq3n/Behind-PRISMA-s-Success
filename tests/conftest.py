"""Test configuration and fixtures for the test suite."""

import pytest
import sys
from pathlib import Path

# Add the code directory to the Python path
code_path = Path(__file__).parent.parent / "code"
sys.path.insert(0, str(code_path))
