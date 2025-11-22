// script.js

// इस फंक्शन का उपयोग सभी पोस्ट पेजों में शेयर और डाउनलोड के लिए होगा।
function setupPostActions() {
    // 1. शेयर फंक्शन
    window.sharePost = function() {
        const ogDescription = document.querySelector('meta[property="og:description"]');
        
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: ogDescription ? ogDescription.content : document.title,
                url: window.location.href,
            })
            .catch((error) => console.error('Error sharing', error));
        } else {
            alert("पोस्ट लिंक कॉपी हो गया है। इसे पेस्ट करके शेयर करें।");
            navigator.clipboard.writeText(window.location.href);
        }
    }

    // 2. डाउनलोड फंक्शन
    window.downloadImage = function() {
        // OG टैग से इमेज URL को उठाओ
        const ogImage = document.querySelector('meta[property="og:image"]');
        
        if (ogImage) {
            const imageUrl = ogImage.content;
            const fileName = document.title.replace(/[^a-z0-9]/gi, '_') + '.jpg'; // फ़ाइल नाम को पोस्ट टाइटल से बनाना
            
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("डाउनलोड करने के लिए इमेज URL नहीं मिली।");
        }
    }
}

// पेज लोड होते ही फंक्शन को चलाएं
document.addEventListener('DOMContentLoaded', setupPostActions);
