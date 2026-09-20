        const artworks = [
            {
                id: 1,
                title: "Starry Serenade",
                artist: "Nirbhay Kumar",
                category: "Paintings",
                medium: "Oil on Canvas",
                year: "2024",
                dimensions: "24 x 36 inches",
                price: "$1,200",
                status: "Available",
                image: "https://i.pinimg.com/originals/1e/44/8c/1e448ce8044a0f99e2035714b49f26c2.jpg",
                shortDesc: "A vibrant expression of twilight skies over tranquil waters.",
                fullDesc: "Starry Serenade captures the tranquil beauty of nighttime celestial reflections over calm coastal waters. Painted with rich oil layers, it embodies peace, imagination, and deep emotional harmony."
            },
            {
                id: 2,
                title: "Cybernetic Horizon",
                artist: "Sahil Sinha",
                category: "Digital Art",
                medium: "Digital Vector & 3D Render",
                year: "2025",
                dimensions: "4K High Resolution",
                price: "$850",
                status: "Available",
                image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
                shortDesc: "Futuristic digital landscape exploring glowing neon grids.",
                fullDesc: "Cybernetic Horizon blends cyberpunk aesthetics with abstract geometry. The artwork visually represents human connection with high-speed technological networks in a vibrant futuristic city."
            },
            {
                id: 3,
                title: "Whispers of Autumn",
                artist: "Abhishek Jha",
                category: "Photography",
                medium: "Digital Photography",
                year: "2023",
                dimensions: "18 x 24 inches Print",
                price: "$450",
                status: "Sold",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
                shortDesc: "Golden sunlight filtering through golden forest pathways.",
                fullDesc: "Shot on high-resolution camera during late October in Vermont, this photograph illustrates the brief yet breathtaking transformation of nature as seasons transition into winter."
            },
            {
                id: 4,
                title: "Harmony in Bronze",
                artist: "Sunny Prakash",
                category: "Sculptures",
                medium: "Cast Bronze",
                year: "2022",
                dimensions: "12 x 8 x 20 inches",
                price: "$3,400",
                status: "Available",
                image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
                shortDesc: "Flowing abstract bronze sculpture exploring physical balance.",
                fullDesc: "Harmony in Bronze is a hand-polished original bronze sculpture representing grace, movement, and structural equilibrium. Its reflective surfaces highlight continuous organic curves."
            },
            {
                id: 5,
                title: "Emerald Forest Mist",
                artist: "Lekhanand Kartik",
                category: "Paintings",
                medium: "Acrylic on Board",
                year: "2024",
                dimensions: "30 x 40 inches",
                price: "$1,550",
                status: "Available",
                image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80",
                shortDesc: "Atmospheric acrylic painting showcasing lush tropical forest canopy.",
                fullDesc: "Featuring vivid emerald greens and warm sunlight breaks, Emerald Forest Mist offers viewers an immersive escape into pristine, untouched woodland nature."
            },
            {
                id: 6,
                title: "Geometrical Dynamics",
                artist: "Keshav Kumar",
                category: "Digital Art",
                medium: "Generative Code Art",
                year: "2025",
                dimensions: "3840 x 2160 px",
                price: "$600",
                status: "Available",
                image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
                shortDesc: "Complex mathematical patterns generated through custom code.",
                fullDesc: "Created using JavaScript canvas algorithms, Geometrical Dynamics explores mathematical beauty, chaos theory, and modern digital symmetry."
            }
        ];

        const galleryGrid = document.getElementById("galleryGrid");
        const searchInput = document.getElementById("searchInput");
        const categoryButtonsContainer = document.getElementById("categoryButtons");
        const resultCount = document.getElementById("resultCount");
        const activeFilterText = document.getElementById("activeFilterText");
        const emptyState = document.getElementById("emptyState");
        const resetFilterBtn = document.getElementById("resetFilterBtn");

        const artModal = document.getElementById("artModal");
        const closeModalBtn = document.getElementById("closeModalBtn");
        const modalImage = document.getElementById("modalImage");
        const modalCategory = document.getElementById("modalCategory");
        const modalTitle = document.getElementById("modalTitle");
        const modalArtist = document.getElementById("modalArtist");
        const modalMedium = document.getElementById("modalMedium");
        const modalYear = document.getElementById("modalYear");
        const modalDimensions = document.getElementById("modalDimensions");
        const modalStatus = document.getElementById("modalStatus");
        const modalDescription = document.getElementById("modalDescription");
        const modalPrice = document.getElementById("modalPrice");
        const inquireBtn = document.getElementById("inquireBtn");

        let currentCategory = "All";
        let currentSearchQuery = "";

        function setupCategoryButtons() {
            const categories = ["All", ...new Set(artworks.map(item => item.category))];

            categoryButtonsContainer.innerHTML = "";
            categories.forEach(category => {
                const button = document.createElement("button");
                button.textContent = category;
                button.className = getButtonClass(category === currentCategory);
                button.addEventListener("click", () => handleCategoryChange(category));
                categoryButtonsContainer.appendChild(button);
            });
        }

        function getButtonClass(isActive) {
            return isActive 
                ? "px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-sm transition"
                : "px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition";
        }

        function renderGallery() {
            galleryGrid.innerHTML = "";

            const filteredArtworks = artworks.filter(art => {
                const matchesCategory = (currentCategory === "All") || (art.category === currentCategory);
                const matchesSearch = art.title.toLowerCase().includes(currentSearchQuery.toLowerCase()) || 
                                      art.artist.toLowerCase().includes(currentSearchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            resultCount.textContent = filteredArtworks.length;
            activeFilterText.textContent = `Filter: ${currentCategory}`;

            if (filteredArtworks.length === 0) {
                emptyState.classList.remove("hidden");
            } else {
                emptyState.classList.add("hidden");
            }

            filteredArtworks.forEach(art => {
                const card = document.createElement("div");
                card.className = "art-card bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between";

                card.innerHTML = `
                    <div>
                        <!-- Card Image -->
                        <div class="relative overflow-hidden group h-52 bg-slate-100">
                            <img 
                                src="${art.image}" 
                                alt="${art.title}" 
                                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onerror="this.src='https://placehold.co/600x400/e2e8f0/475569?text=Artwork+Image'"
                            >
                            <span class="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">
                                ${art.category}
                            </span>
                        </div>

                        <!-- Card Body -->
                        <div class="p-5">
                            <h3 class="text-lg font-bold text-slate-800 line-clamp-1">${art.title}</h3>
                            <p class="text-xs text-indigo-600 font-medium mt-0.5">By ${art.artist}</p>
                            <p class="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">${art.shortDesc}</p>
                        </div>
                    </div>

                    <!-- Card Footer -->
                    <div class="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2 pt-3">
                        <span class="text-sm font-bold text-slate-900">${art.price}</span>
                        <button 
                            onclick="openArtworkModal(${art.id})" 
                            class="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white text-xs font-semibold rounded-lg transition duration-200"
                        >
                            View Details
                        </button>
                    </div>
                `;

                galleryGrid.appendChild(card);
            });
        }

        function openArtworkModal(id) {
            const art = artworks.find(item => item.id === id);
            if (!art) return;

            modalImage.src = art.image;
            modalCategory.textContent = art.category;
            modalTitle.textContent = art.title;
            modalArtist.textContent = art.artist;
            modalMedium.textContent = art.medium;
            modalYear.textContent = art.year;
            modalDimensions.textContent = art.dimensions;
            modalStatus.textContent = art.status;
            modalDescription.textContent = art.fullDesc;
            modalPrice.textContent = art.price;

            artModal.classList.remove("hidden");
            document.body.style.overflow = "hidden"; // Disable scroll when modal is active
        }

        function closeModal() {
            artModal.classList.add("hidden");
            document.body.style.overflow = "auto"; // Restore scroll
        }

        function handleCategoryChange(category) {
            currentCategory = category;
            setupCategoryButtons(); // Refresh button styling
            renderGallery();
        }

        searchInput.addEventListener("input", (e) => {
            currentSearchQuery = e.target.value.trim();
            renderGallery();
        });

        resetFilterBtn.addEventListener("click", () => {
            currentCategory = "All";
            currentSearchQuery = "";
            searchInput.value = "";
            setupCategoryButtons();
            renderGallery();
        });

        closeModalBtn.addEventListener("click", closeModal);

        artModal.addEventListener("click", (e) => {
            if (e.target === artModal) {
                closeModal();
            }
        });

        inquireBtn.addEventListener("click", () => {
            const msgBox = document.createElement('div');
            msgBox.className = 'fixed top-6 right-6 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-xl z-[200] font-medium text-sm animate-fade-in';
            msgBox.textContent = 'Thank you for your interest! An inquiry has been sent to the artist.';
            document.body.appendChild(msgBox);
            setTimeout(() => {
                msgBox.style.opacity = '0';
                msgBox.style.transition = 'opacity 0.3s ease';
                setTimeout(() => msgBox.remove(), 300);
            }, 3000);
        });

        window.addEventListener("DOMContentLoaded", () => {
            setupCategoryButtons();
            renderGallery();
        });


        function copySource(type) {
            let copyContent = '';
            
            try {
                if (type === 'css') {
                    copyContent = document.getElementById('app-styles').textContent.trim();
                    
                } else if (type === 'js') {
                    let jsContent = document.getElementById('app-script').textContent.trim();
                    const splitToken = "/* --- EXPORT WIDGET LOGIC --- */";
                    if (jsContent.includes(splitToken)) {
                        jsContent = jsContent.split(splitToken)[0].trim();
                    }
                    copyContent = jsContent;
                    
                } else if (type === 'html') {
                    const bodyClone = document.body.cloneNode(true);
                    
                    const elementsToRemove = bodyClone.querySelectorAll('script, style, #devExportWidget');
                    elementsToRemove.forEach(el => el.remove());
                    
                    const bodyHTML = bodyClone.innerHTML.replace(/^\s*[\r\n]/gm, ''); 

                    copyContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Art Gallery - Project by Nirbhay Kumar</title>
    
    <!-- Tailwind CSS for clean layout utility -->
    <script src="https://cdn.tailwindcss.com"><\/script>
    
    <!-- FontAwesome Icons for clean UI elements -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- External CSS -->
    <link rel="stylesheet" href="style.css">
</head>
<body class="min-h-screen flex flex-col">
${bodyHTML}
    <!-- External JS -->
    <script src="script.js"><\/script>
</body>
</html>`;
                }
                const textArea = document.createElement("textarea");
                textArea.value = copyContent;
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.position = "fixed";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (successful) {
                    showToast(type);
                } else {
                    console.error('Fallback copying failed');
                }
            } catch (err) {
                console.error('Failed to copy text', err);
            }
        }

        function showToast(type) {
            const toast = document.getElementById('copyToast');
            toast.innerHTML = `<i class="fa-solid fa-check mr-1"></i> Copied <strong>${type.toUpperCase()}</strong> to clipboard!`;
            toast.classList.remove('hidden');
            
            void toast.offsetWidth; 
            
            toast.classList.remove('opacity-0');
            toast.classList.add('opacity-100');
            
            setTimeout(() => {
                toast.classList.remove('opacity-100');
                toast.classList.add('opacity-0');
                setTimeout(() => toast.classList.add('hidden'), 300); // match transition duration
            }, 2500);
        }