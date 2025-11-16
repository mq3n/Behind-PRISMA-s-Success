"""Basic tests to verify the package structure."""

import sys
from pathlib import Path


def test_package_import():
    """Test that the package can be imported."""
    # Add code directory to path
    code_path = Path(__file__).parent.parent / "code"
    sys.path.insert(0, str(code_path))
    
    # Try to import the package
    import __init__ as package
    
    assert hasattr(package, "__version__")
    assert package.__version__ == "0.1.0"


def test_directory_structure():
    """Test that the expected directory structure exists."""
    base_path = Path(__file__).parent.parent
    
    expected_dirs = ["code", "data", "docs", "results", "notebooks", "tests"]
    
    for dir_name in expected_dirs:
        dir_path = base_path / dir_name
        assert dir_path.exists(), f"Directory {dir_name} should exist"
        assert dir_path.is_dir(), f"{dir_name} should be a directory"


def test_required_files_exist():
    """Test that required configuration files exist."""
    base_path = Path(__file__).parent.parent
    
    required_files = [
        "README.md",
        "LICENSE",
        "requirements.txt",
        ".gitignore",
        "CONTRIBUTING.md",
        "CODE_OF_CONDUCT.md",
        "setup.py",
        "CITATION.cff",
    ]
    
    for file_name in required_files:
        file_path = base_path / file_name
        assert file_path.exists(), f"File {file_name} should exist"
        assert file_path.is_file(), f"{file_name} should be a file"
