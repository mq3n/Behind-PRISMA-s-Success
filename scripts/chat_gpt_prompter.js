(async () => {
    const records = [
        {
            "title": "House style recognition using deep convolutional neural network",
            "abstract": "The recent development in deep learning has opened up a new era of possibilities, once difficult to achieve with conventional methods, to revolutionize image recognition, speech recognition, and natural language processing. Specifically, image recognition has been widely applied in various areas such as face recognition, object identification for security, and other purposes. Although it is rarely applied to discover new methods for use in architecture, image recognition has great potential in architectural design. For example, it can be used to identify the preference of the client and to design a building that satisfies a client's aesthetic preference. One of the major hurdles of utilizing image recognition in architecture is the architectural styles based on culture, location, and time. For that reason, it is difficult to identify an architectural style by non-trained clients and sometimes certain buildings are composed of different styles that are difficult to identify by experts as one style. This paper explores the possibility of using state-of-the-art image recognition algorithms in house style recognition to find out its limitations and possibilities. Moreover, the paper adopted a convolutional neural network model for classifying house styles in the US. Although the final accuracy is not high due to the lack of image datasets, the trained model performed reasonable predictions with a limited test set. The results show the importance of properly defining style for image recognition to improve its accuracy. © 2020 Elsevier B.V.",
            "eid": "2-s2.0-85087091465"
        },
        {
            "title": "Brightearth City Texturing : Faithful Procedural 3d Urban Modeling From Satellite and Ground Imagery",
            "abstract": "BrightEarth City Texturing is an automatic and resource-efficient 3D urban modeling pipeline, producing quality low-poly 3D models with high-resolution seamless textures suitable for real-time rendering. From a single satellite image it extracts building geometry with footprint polygons along with attributes such as building height, roof shape, and roof texture. If ground images are available it can also faithfully texture facades in terms of architectural style. © 2023 IEEE.",
            "eid": "2-s2.0-85178336467"
        }
    ];

    const textarea = () => document.querySelector('#prompt-textarea');
    const sendBtn = () => document.querySelector('#composer-submit-button');

    function setPrompt(t) {
        const ta = textarea();
        ta.textContent = t;
        ta.dispatchEvent(new InputEvent('input', { bubbles: true }));
    }

    function clickSend() { sendBtn().click(); }

    function countAssistant() {
        return document.querySelectorAll('[data-message-author-role="assistant"], [data-message-author-role="system"]').length;
    }

    function waitReply(prev, timeout = 120000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const obs = new MutationObserver(() => {
                const msgs = document.querySelectorAll('[data-message-author-role="assistant"], [data-message-author-role="system"]');
                if (msgs.length > prev) {
                    const last = msgs[msgs.length - 1];
                    const copyButton = last.querySelector("button");
                    copyButton.click();
                    setTimeout(300);
                    //const clipboardContent = await navigator.clipboard.readText(); 
                    //const clipboardContent = navigator.clipboard.readText(); 
                    //resolve(clipboardContent); 
                    resolve(last.innerText || last.textContent || '');
                    obs.disconnect();
                } else if (Date.now() - start > timeout) {
                    obs.disconnect();
                    reject(new Error('timeout'));
                }
            });

            obs.observe(document.body, { childList: true, subtree: true });
        });
    }

    function promptFor(abstract) {
        return `You are an annotator. Work ONLY with the Abstract. Return JSON {summary, yes_no}. When in doubt -> "no". 

 

Abstract: 

${abstract} 

 

Return JSON ONLY.`;
    }

    function parseJSON(txt) {
        const m = txt.match(/\{[\s\S]*\}/);
        if (!m) throw new Error('no json');
        return JSON.parse(m[0]);
    }

    const out = [];
    for (const r of records) {
        const prev = countAssistant();
        setPrompt(promptFor(r.abstract));
        await new Promise(r => setTimeout(r, 1500));
        clickSend();
        const reply = await waitReply(prev);
        let summary = 'Failed', yes_no = 'no';
        try { const obj = parseJSON(reply); summary = (obj.summary || '').toString().trim(); yes_no = ((obj.yes_no || 'no') + '').toLowerCase() === 'yes' ? 'yes' : 'no'; } catch (e) { }
        out.push({ title: r.title, summary, yes_no });
        await new Promise(r => setTimeout(r, 2000));
    }

    console.table(out);
})();