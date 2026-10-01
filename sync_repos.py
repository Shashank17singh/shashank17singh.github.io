import re
import subprocess
import time

def main():
    """Reads the portfolio HTML, extracts project metadata, and syncs it to GitHub repos."""
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    projects_match = re.search(r'<div class="projects-grid">(.*?)</section>', html, re.DOTALL)
    if not projects_match:
        print("Could not find projects grid")
        return
        
    projects_html = projects_match.group(1)
    cards = projects_html.split('<div class="project-card reveal">')[1:]
    
    print(f"Found {len(cards)} project cards.")
    
    for card in cards:
        title_match = re.search(r'<div class="project-title">(.*?)</div>', card)
        if not title_match: continue
        title_full = title_match.group(1).replace("<em>", "").replace("</em>", "")
        
        desc_match = re.search(r'<div class="project-desc">(.*?)</div>', card)
        desc = desc_match.group(1) if desc_match else ""
        if len(desc) > 350:
            desc = desc[:347] + "..."
            
        stack_match = re.search(r'<div class="project-stack">(.*?)</div>', card)
        topics = []
        if stack_match:
            pill_html = stack_match.group(1)
            pills = re.findall(r'<span class="stack-pill">(.*?)</span>', pill_html)
            for p in pills:
                t = re.sub(r'[^a-z0-9-]', '-', p.lower()).strip('-')
                t = re.sub(r'-+', '-', t) # remove double hyphens
                if t and len(t) <= 35:
                    topics.append(t)
                    
        gh_match = re.search(r'href="(https://github\.com/Shashank17singh/([^"]+))"', card)
        if not gh_match:
            print(f"Skipping {title_full} - no GitHub link found in card.")
            continue
            
        repo_name = gh_match.group(2).strip('/').split('#')[0]
        
        print(f"\n--- Updating {repo_name} ---")
        print(f"Desc: {desc[:50]}...")
        print(f"Topics: {topics}")
        
        try:
            # Edit description
            subprocess.run(['gh', 'repo', 'edit', f'Shashank17singh/{repo_name}', '-d', desc], check=True)
            # Edit topics
            if topics:
                subprocess.run(['gh', 'repo', 'edit', f'Shashank17singh/{repo_name}', '--add-topic', ",".join(topics)], check=True)
        except Exception as e:
            print(f"Error updating {repo_name}: {e}")
            
        time.sleep(1) # Prevent rate limiting

if __name__ == "__main__":
    main()
