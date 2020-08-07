async function getAgentList(query){
    var list;

    
    var url = "https://agents.farmers.com/search.html?qp="+query;
    console.log(url);

    var agentList =  await axios.request({
            responseType: 'json',
            url: url,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(query);
            console.log("here");
            agentList = [];
            for (var location of response.data.locations) {
                agentList.push({
                    photo: location.loc.customByName['Headshot Url'],
                    name: location.loc.customByName.AgentName,
                    milesToQueryLocation: location.loc.milesToQueryLocation,
                    phone: location.loc.phone,
                    address1: location.loc.address1,
                    address2: location.loc.address2,
                    city: location.loc.city,
                    state: location.loc.state,
                    postalCode: location.loc.postalCode,
                    country: location.loc.country,
                    zipwhipEnabled: location.loc.customByName['Zipwhip Enrolled'] // Typically null but sometimes true
                });
            }
            list = agentList;       
            // console.log(list);
            
            
        });

        return list;
}