// Apologies page functionality
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("apologies-container");
    
    if (!container || !apologiesData || apologiesData.length === 0) {
        container.innerHTML = '<p class="no-apologies">No apologies yet. Check back soon.</p>';
        return;
    }

    // Sort by date (newest first) - already in reverse chronological order
    const sortedApologies = [...apologiesData].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Render apologies
    sortedApologies.forEach((apology, index) => {
        const apologyElement = document.createElement("div");
        apologyElement.className = "apology-card";
        apologyElement.style.opacity = "0";
        apologyElement.style.transform = "translateY(30px)";
        
        const paragraphs = apology.text.split('\n').filter(p => p.trim()).map(p => '<p>' + p + '</p>').join('');
        
        apologyElement.innerHTML = `
            <div class="apology-date">${formatDate(apology.date)}</div>
            <div class="apology-text">${paragraphs}</div>
        `;
        
        container.appendChild(apologyElement);
        
        // Fade in animation
        setTimeout(() => {
            apologyElement.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            apologyElement.style.opacity = "1";
            apologyElement.style.transform = "translateY(0)";
        }, index * 150);
    });
});
