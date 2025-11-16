"""Setup configuration for Behind PRISMA's Success project."""

from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

with open("requirements.txt", "r", encoding="utf-8") as fh:
    requirements = [line.strip() for line in fh if line.strip() and not line.startswith("#")]

setup(
    name="behind-prisma-success",
    version="0.1.0",
    author="mq3n",
    description="Research code for 'Behind PRISMA's Success: GAI's Support in Action'",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/mq3n/Behind-PRISMA-s-Success",
    packages=find_packages(where="code"),
    package_dir={"": "code"},
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Science/Research",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
    python_requires=">=3.8",
    install_requires=requirements,
    extras_require={
        "dev": [
            "pytest>=6.2.0",
            "pytest-cov>=2.12.0",
            "black>=21.0",
            "flake8>=3.9.0",
            "mypy>=0.910",
        ],
    },
)
