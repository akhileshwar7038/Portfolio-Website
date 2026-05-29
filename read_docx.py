import zipfile
import xml.etree.ElementTree as ET

def docx_to_text(docx_path):
    try:
        with zipfile.ZipFile(docx_path) as docx:
            xml_content = docx.read('word/document.xml')
            root = ET.fromstring(xml_content)
            
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            paragraphs = []
            for para in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                texts = []
                for run in para.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                    if run.text:
                        texts.append(run.text)
                if texts:
                    paragraphs.append("".join(texts))
                else:
                    paragraphs.append("")
            
            return "\n".join(paragraphs)
    except Exception as e:
        return f"Error reading docx: {e}"

if __name__ == "__main__":
    resume_path = "Akhileshwar Songala Resume FS.docx"
    text = docx_to_text(resume_path)
    with open("resume.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("Resume text saved to resume.txt")
