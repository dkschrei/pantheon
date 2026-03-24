import json
import subprocess
import sys
from pathlib import Path

import pytest

sys.path.insert(0, "scripts")

SAMPLE_BRIEF = {
    "current_event": "OpenAI researchers leaving for xAI at 3x salary",
    "gem_name": "gollum-effect",
    "gem_summary": "Identity fusion with a capability until transfer feels like death",
    "historical_precedent": "William Shockley invented the transistor at Bell Labs, then watched his best researchers leave to found Fairchild Semiconductor because he couldn't let go of control.",
    "historical_outcome": "Shockley's hoarding produced nothing. The people he couldn't release built Silicon Valley.",
    "open_loop": "Altman built the most capable AI researchers in the world and is learning the same lesson Shockley learned. The ring always escapes.",
    "source_urls": []
}

WRITER_SCRIPT = Path("/Users/danaschreiber/Dev-Projects/pantheon/scripts/writer.py")

def run_writer(brief: dict) -> dict:
    result = subprocess.run(
        [sys.executable, str(WRITER_SCRIPT)],
        input=json.dumps(brief),
        capture_output=True, text=True
    )
    assert result.returncode == 0, f"writer.py failed: {result.stderr}"
    return json.loads(result.stdout.strip())

@pytest.fixture(scope="module")
def writer_output():
    return run_writer(SAMPLE_BRIEF)

def test_writer_returns_required_fields(writer_output):
    assert "x_post" in writer_output
    assert "threads_post" in writer_output
    assert "subject_line" in writer_output

def test_x_post_within_char_limit(writer_output):
    assert len(writer_output["x_post"]) <= 280, f"X post too long: {len(writer_output['x_post'])} chars"

def test_threads_post_within_char_limit(writer_output):
    assert len(writer_output["threads_post"]) <= 500, f"Threads post too long: {len(writer_output['threads_post'])} chars"

def test_no_em_dashes_in_output(writer_output):
    assert "\u2014" not in writer_output["x_post"], "em-dash found in X post"
    assert "\u2014" not in writer_output["threads_post"], "em-dash found in Threads post"
