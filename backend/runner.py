import subprocess

def get_code():
    #eventually will replace END sentinel with a run button or something on the ui
    lines = []
    print("Enter Python code. Type END on a line by itself when finished.")

    while True:
        line = input()
        if line == "END":
            break
        lines.append(line) 
    
    code = "\n".join(lines)
    return code



def run_python(code: str):
    print("CODE RECEIVED:")
    print(repr(code))

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
                "std_error": "",
                "return code":out.returncode
            }
        else:
            return {
                "success": False,
                "std_out": out.stdout,
                "std_error": out.stderr,
                "return code": out.returncode
            }

    except subprocess.TimeoutExpired:
        return {
            "success": False,
            "std_out": "",
            "std_error": "Timeout"
        }