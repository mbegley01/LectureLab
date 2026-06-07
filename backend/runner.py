import subprocess

def run_python(code: str):
    with open("temp.py", "w") as file:
        file.write(code)

    try:
        out = subprocess.run(
            ["python", "temp.py"],
            capture_output=True,
            text=True,
            timeout=5.5
        )

        if out.returncode == 0:
            return {
                "success": True,
                "std_out": out.stdout,
                "std_error": ""
            }

        return {
            "success": False,
            "std_out": "",
            "std_error": out.stderr
        }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "std_out": "",
            "std_error": "Timeout"
        }