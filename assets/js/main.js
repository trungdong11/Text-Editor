// execCommand(aCommandName, aShowDefaultUI, aValueArgument)

function formatDoc(cmd, value=null) {
    if(value) {
        document.execCommand(cmd, false, value);
    } else {
        document.execCommand(cmd)
    }
}

function addLink() {
    const url = prompt('Insert url')
    formatDoc('createLink', url)
}

const content = document.getElementById('content');

content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item=> {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})


const showCode = document.getElementById('show-code');
let active = false;

showCode.addEventListener('click', function () {
	showCode.dataset.active = !active;
	active = !active
	if(active) {
		content.textContent = content.innerHTML;
        console.log(content.textContent)
        //khong sua doan text
		content.setAttribute('contenteditable', false);
	} else {
		content.innerHTML = content.textContent;
		content.setAttribute('contenteditable', true);
	}
})

const filename = document.getElementById('filename')

function fileHandle(value) {
    if(value === 'new') {
        content.innerHTML = ''
        filename.value = 'untitled'
    } else if(value === 'txt') {
        const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
        filename.value = 'untitled'
    } else if(value === 'pdf') {
        html2pdf(content).save(filename.value);
        filename.value = 'untitled'

    }
}


// function fontEditor() {
//     // var fontName = document.getElementById("fontName").value;
//     // document.execCommand('fontName', false, fontName);
//     // iView.document.execCommand(style.font-family:+fontname;, true);
// }
function setFontFamilyOnContent(fontFamily)
{
    window.getSelection().selectAllChildren(editableDiv);
    document.execCommand("FontName", false, fontFamily);
    return editableDiv.firstChild;
}

let fontName = document.getElementById("fontName");
//List of fontlist
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
  ];
fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });