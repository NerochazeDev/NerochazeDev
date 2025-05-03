import fetch from 'node-fetch';

async function updateAIProject() {
  console.log("Updating AI-Powered Content Generator project image...");
  
  const projectId = 5; // The ID of the AI project we created
  const updatedData = {
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
  };
  
  try {
    // Use PUT instead of PATCH based on the server routes implementation
    const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    
    // Check if response is OK before trying to parse JSON
    if (response.ok) {
      const result = await response.json();
      console.log(`✓ Successfully updated AI project image:`, result);
    } else {
      console.error(`✗ Failed to update AI project image. Status: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(`✗ Error updating AI project image:`, error.message);
  }
}

updateAIProject().catch(console.error);