import subprocess
import tempfile
import os


def run_python(code: str):

    with tempfile.NamedTemporaryFile(
        mode="w",
        suffix=".py",
        delete=False
    ) as file:

        file.write(code)

        temp_path = file.name


    try:

        out = subprocess.run(

            [
                "docker",
                "run",

                "--rm",

                "--network=none",

                "--memory=256m",

                "--cpus=1",

                "--pids-limit=50",

                "-v",

                f"{temp_path}:/sandbox/temp.py",

                "slide-python-runner",

                "python",

                "/sandbox/temp.py"

            ],

            capture_output=True,

            text=True,

            timeout=6
        )


        return {
            "success": out.returncode == 0,

            "std_out": out.stdout,

            "std_error": out.stderr,

            "return_code": out.returncode
        }


    except subprocess.TimeoutExpired:

        return {
            "success": False,

            "std_out": "",

            "std_error": "Timeout"
        }


    finally:

        os.remove(temp_path)