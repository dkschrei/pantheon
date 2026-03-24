import sys
sys.path.insert(0, "scripts")
from researcher import load_gem_summaries
from pathlib import Path

PATTERNS_DIR = Path("/Users/danaschreiber/Dev-Projects/pantheon/patterns")

def test_load_gem_summaries_returns_list():
    summaries = load_gem_summaries(PATTERNS_DIR)
    assert isinstance(summaries, list)
    assert len(summaries) > 0

def test_each_summary_has_name_and_text():
    summaries = load_gem_summaries(PATTERNS_DIR)
    for s in summaries:
        assert "name" in s
        assert "summary" in s
        assert len(s["summary"]) <= 300
        assert len(s["name"]) > 0

def test_summary_count_matches_pattern_dirs():
    summaries = load_gem_summaries(PATTERNS_DIR)
    expected = len([d for d in PATTERNS_DIR.iterdir() if d.is_dir()])
    assert len(summaries) == expected
