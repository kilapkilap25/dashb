        function showProfile() {
            document.getElementById('profilePage').style.display = 'block';
            document.getElementById('qrPage').style.display = 'none';
            document.getElementById('idPage').style.display = 'none';
        }
        
        function showQRCode() {
            document.getElementById('profilePage').style.display = 'none';
            document.getElementById('qrPage').style.display = 'flex';
            document.getElementById('idPage').style.display = 'none';
        }
        
        function showIDCard() {
            document.getElementById('profilePage').style.display = 'none';
            document.getElementById('qrPage').style.display = 'none';
            document.getElementById('idPage').style.display = 'flex';
        }
        
        function goBack() {
            // This would normally navigate back in a real app
            alert("Back button clicked");
        }