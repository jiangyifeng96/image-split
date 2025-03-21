document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-upload');
    const previewArea = document.getElementById('preview-area');
    const gridPreview = document.getElementById('grid-preview');
    const downloadAllBtn = document.getElementById('download-all');
    const resetBtn = document.getElementById('reset');

    // Drag and drop handlers
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        uploadArea.classList.add('dragover');
    }

    function unhighlight(e) {
        uploadArea.classList.remove('dragover');
    }

    // Handle dropped files
    uploadArea.addEventListener('drop', handleDrop, false);
    fileInput.addEventListener('change', handleFileSelect, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                processImage(file);
            } else {
                alert('Please upload an image file.');
            }
        }
    }

    // Process and split image
    function processImage(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                splitImage(img);
                previewArea.classList.remove('hidden');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function splitImage(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate dimensions for each grid piece
        const pieceWidth = img.width / 3;
        const pieceHeight = img.height / 3;
        
        // Clear previous grid
        gridPreview.innerHTML = '';
        
        // Create 9 pieces
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const pieceCanvas = document.createElement('canvas');
                const pieceCtx = pieceCanvas.getContext('2d');
                
                pieceCanvas.width = pieceWidth;
                pieceCanvas.height = pieceHeight;
                
                // Draw the piece
                pieceCtx.drawImage(
                    img,
                    col * pieceWidth,
                    row * pieceHeight,
                    pieceWidth,
                    pieceHeight,
                    0,
                    0,
                    pieceWidth,
                    pieceHeight
                );
                
                // Create grid item
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';
                
                const pieceImg = document.createElement('img');
                pieceImg.src = pieceCanvas.toDataURL('image/png');
                pieceImg.alt = `Grid piece ${row * 3 + col + 1}`;
                
                gridItem.appendChild(pieceImg);
                gridPreview.appendChild(gridItem);
            }
        }
    }

    // Download functionality
    downloadAllBtn.addEventListener('click', downloadAllPieces);
    async function downloadAllPieces() {
        const pieces = gridPreview.querySelectorAll('.grid-item img');
        const zip = new JSZip();
        
        // Add loading state
        downloadAllBtn.disabled = true;
        downloadAllBtn.classList.add('loading');
        
        try {
            // Add each piece to the zip
            for (let i = 0; i < pieces.length; i++) {
                const piece = pieces[i];
                // Convert base64 to blob
                const response = await fetch(piece.src);
                const blob = await response.blob();
                zip.file(`grid-piece-${i + 1}.png`, blob);
            }
            
            // Generate zip file
            const content = await zip.generateAsync({type: "blob"});
            
            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = "grid-pieces.zip";
            link.click();
            
            // Cleanup
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error creating zip file:', error);
            alert('Error creating zip file. Please try again.');
        } finally {
            // Remove loading state
            downloadAllBtn.disabled = false;
            downloadAllBtn.classList.remove('loading');
        }
    }

    // Reset functionality
    resetBtn.addEventListener('click', resetTool);
    function resetTool() {
        fileInput.value = '';
        gridPreview.innerHTML = '';
        previewArea.classList.add('hidden');
    }
}); 