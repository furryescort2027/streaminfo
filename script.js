const container = document.getElementsByClassName('mod-container')[0];

async function loadModIDs()
{
    const response = await fetch('assets/modlist.json');
    return await response.json();
}

async function fetchMod(id)
{
    let response = await fetch(`https://api.geode-sdk.org/v1/mods/${id}`);
    const responce = await response.json();
    const mod = responce.payload;

    const developers = mod.developers?.map(developer => [ developer.display_name, `https://geode-sdk.org/mods?developer=${developer.username}` ]);
    const download = mod.versions[0].download_link;
    const link = `https://geode-sdk.org/mods/${id}`;
    const icon = `https://api.geode-sdk.org/v1/mods/${id}/logo`;
    const name = mod.versions[0].name;

    return { developers, download, icon, link, name };
}

async function loadMods(_modIDs)
{
    for (const id of _modIDs) {
        const mod = await fetchMod(id);
        if (!mod) continue;

        const image = document.createElement("img");
        image.src = mod.icon;

        const icon = document.createElement("a");
        icon.className = "mod-icon";
        icon.href = mod.link;
        icon.appendChild(image);

        const name = document.createElement("a");
        name.className = "mod-name";
        name.href = mod.link;
        name.textContent = mod.name;

        const developers = document.createElement("span");
        developers.className = "mod-devs";

        mod.developers.forEach((developerInfo, index) => {
            const developer = document.createElement("a");
            developer.href = developerInfo[1];
            
            const isLast = index === mod.developers.length - 1;
            developer.textContent = isLast ? developerInfo[0] : `${developerInfo[0]},`;

            developers.appendChild(developer);
        });

        const info = document.createElement("div");
        info.className = "mod-info";
        info.appendChild(name);
        info.appendChild(developers);

        const cardTop = document.createElement("div");
        cardTop.className = "card-top";
        cardTop.appendChild(icon);
        cardTop.appendChild(info);

        const downloadSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        downloadSVG.setAttribute("viewBox", "0 0 24 24");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7z");

        
        downloadSVG.appendChild(path);

        const downloadButton = document.createElement("a");
        downloadButton.className = "download-link";
        downloadButton.href = mod.download;
        downloadButton.appendChild(downloadSVG);
        downloadButton.appendChild(document.createTextNode("Download"));

        const cardBottom = document.createElement("span");
        cardBottom.className = "card-bottom";
        cardBottom.appendChild(downloadButton);

        const card = document.createElement("div");
        card.className = "mod-card";
        card.appendChild(cardTop);
        card.appendChild(cardBottom);

        container.appendChild(card);
    }
}

(async function main()
{
    const modIDs = await loadModIDs();
    if (modIDs && modIDs.length > 0) await loadMods(modIDs);
})();