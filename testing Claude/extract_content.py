#!/usr/bin/env python3
import urllib.request
import re
from html.parser import HTMLParser
from html import unescape

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_content = []
        self.current_text = ""
        self.in_script = False
        self.in_style = False
        
    def handle_starttag(self, tag, attrs):
        if tag in ['script', 'style']:
            if tag == 'script':
                self.in_script = True
            elif tag == 'style':
                self.in_style = True
                
    def handle_endtag(self, tag):
        if tag in ['script', 'style']:
            self.in_script = False
            self.in_style = False
        elif tag in ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'li', 'a']:
            if self.current_text.strip():
                self.text_content.append(self.current_text.strip())
            self.current_text = ""
            
    def handle_data(self, data):
        if not self.in_script and not self.in_style:
            cleaned = unescape(data.strip())
            if cleaned and len(cleaned) > 2:
                self.current_text += " " + cleaned

try:
    url = "https://riaancjb.wixstudio.com/riaanburger"
    print(f"Fetching content from {url}...")
    
    with urllib.request.urlopen(url, timeout=10) as response:
        html = response.read().decode('utf-8', errors='ignore')
    
    parser = TextExtractor()
    parser.feed(html)
    
    # Filter out common Wix noise and get meaningful content
    meaningful_content = []
    seen = set()
    
    for text in parser.text_content:
        text = text.strip()
        # Filter out very short strings, numbers only, or common Wix elements
        if (len(text) > 10 and 
            not text.isdigit() and 
            not text.startswith('var ') and
            not text.startswith('function') and
            'wix' not in text.lower() and
            text not in seen):
            seen.add(text)
            meaningful_content.append(text)
    
    print("\n=== EXTRACTED CONTENT ===\n")
    for i, content in enumerate(meaningful_content[:100], 1):
        print(f"{i}. {content}")
        
    # Save to file
    with open('extracted_content.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(meaningful_content))
    
    print(f"\n\nExtracted {len(meaningful_content)} content items. Saved to extracted_content.txt")
    
except Exception as e:
    print(f"Error: {e}")
