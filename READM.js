(function() {
    'use strict';

    const rtsStartStr = 'rtsProductsNumber%22%3A';
    const rtsEndStr = '2%2C%22firstPageUrl';
    const ctzStartStr = 'ctzProductsNumber%22%3A';
    const ctzEndStr = '%2C%22pageLines';

    function extractData() {
        const html = document.documentElement.outerHTML;

        // 提取 rtsProductsNumber%22%3A 和 2%2C%22firstPageUrl 之间的数据
        const rtsStartIndex = html.indexOf(rtsStartStr);
        const rtsEndIndex = html.indexOf(rtsEndStr, rtsStartIndex + rtsStartStr.length);

        let rtsExtractedData;
        if (rtsStartIndex !== -1 && rtsEndIndex !== -1) {
            rtsExtractedData = html.slice(rtsStartIndex + rtsStartStr.length, rtsEndIndex);
        } else {
            rtsExtractedData = '未找到 rts 匹配数据';
        }

        // 提取 ctzProductsNumber%22%3A 和 %2C%22pageLines 之间的数据
        const ctzStartIndex = html.indexOf(ctzStartStr);
        const ctzEndIndex = html.indexOf(ctzEndStr, ctzStartIndex + ctzStartStr.length);

        let ctzExtractedData;
        if (ctzStartIndex !== -1 && ctzEndIndex !== -1) {
            ctzExtractedData = html.slice(ctzStartIndex + ctzStartStr.length, ctzEndIndex);
        } else {
            ctzExtractedData = '未找到 定制品 匹配数据';
        }

        // 查找导航栏元素
        const navElement = document.querySelector('div.navigation.fix');
        if (!navElement) {
            console.error('未找到导航栏元素');
            return;
        }

        // 获取导航栏元素的位置和高度
        const navRect = navElement.getBoundingClientRect();
        const navTop = navRect.top + window.scrollY;
        const navHeight = navRect.height;

        // 创建一个用于显示结果的元素
        const resultDiv = document.createElement('div');
        resultDiv.style.position = 'absolute';
        resultDiv.style.top = `${navTop + navHeight}px`;
        resultDiv.style.left = '50%';
        resultDiv.style.transform = 'translateX(-50%)';
        resultDiv.style.width = 'fit-content';
        resultDiv.style.minWidth = '200px'; // 可根据需要调整最小宽度
        resultDiv.style.backgroundColor = '#FF0000'; // 浅粉色底色
        resultDiv.style.color = 'white'; // 白色文字
        resultDiv.style.padding = '10px';
        resultDiv.style.border = '1px solid black';
        resultDiv.style.boxSizing = 'border-box';
        resultDiv.style.zIndex = '9999';
        resultDiv.style.textAlign = 'center'; // 文字居中

        // 将提取的数据显示在该元素中
        resultDiv.textContent = `RTS产品数量: ${rtsExtractedData}\n定制品产品数量: ${ctzExtractedData}`;

        // 将结果元素添加到页面中
        document.body.appendChild(resultDiv);
    }

    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                extractData();
                observer.disconnect(); // 数据提取完成后停止监听
                break;
            }
        }
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
})();
window.addEventListener('load', function () {
    // 尝试从 meta 标签获取关键词
    const metaKeywordsElement = document.querySelector('meta[name="keywords"]');
    let keywords = [];
    // 检查 meta 标签是否存在
    if (metaKeywordsElement) {
        // 提取 meta 标签中的关键词并去除前后空格
        keywords = metaKeywordsElement.content.split(',').map(keyword => keyword.trim());
    }
    // 定义函数用于提取 "Buy" 和 "Product" 之间的内容
    function extractBetweenBuyAndProduct(keyword) {
        const startIndex = keyword.indexOf('Buy');
        if (startIndex === -1) {
            return null;
        }
        const newStartIndex = startIndex + 'Buy'.length;
        const endIndex = keyword.indexOf('Product', newStartIndex);
        if (endIndex === -1) {
            return null;
        }
        return keyword.slice(newStartIndex, endIndex).trim();
    }
    // 遍历关键词，提取符合要求的内容
    const extractedContents = keywords.map(extractBetweenBuyAndProduct).filter(Boolean);
    // 取前三个提取到的内容
    const topThreeExtracted = extractedContents.slice(0, 3);
    // 查找页面标题元素
    const titleElement = document.querySelector('h1');
    if (!titleElement) {
        console.error('未找到页面标题元素');
        return;
    }
    // 创建黑色文本元素
    const blackTextElement = document.createElement('span');
    const verifiedIcon = '✅';
    blackTextElement.textContent = `${verifiedIcon}【专注国际站黑科技8年】`;
    blackTextElement.style.color = 'black';
    blackTextElement.style.fontSize = '14px';
    blackTextElement.style.alignSelf = 'center';
    blackTextElement.style.backgroundColor = '#ffe5e5'; // 浅粉色底色
    blackTextElement.style.padding = '5px 10px'; // 添加内边距
    blackTextElement.style.borderRadius = '5px'; // 圆角边框
    // 创建四个橙色底色、白色文字的文本元素及对应的超链接
    const texts = ["普通品秒变认证品", "自动跳转WhatsApp", "全屏询盘", "咨询更多科技"];
    const links = [
        "https://mp.weixin.qq.com/s/F7ZpaqBte3GVN7oNKnGeJQ",
        "https://mp.weixin.qq.com/s/TeGFt8iPAv04BwxzJ9NfbQ",
        "https://mp.weixin.qq.com/s/xY4PxImDBUxPLlcCTYk6WQ",
        "https://mp.weixin.qq.com/s/eWsTKauOJQSKdZj3E5k-FQ"
    ];
    const textContainer = document.createElement('div');
    textContainer.style.display = 'flex';
    textContainer.style.gap = '10px';
    textContainer.style.marginTop = '5px';
    texts.forEach((text, index) => {
        const linkElement = document.createElement('a');
        linkElement.href = links[index];
        linkElement.target = '_blank'; // 让链接在新窗口中打开
        const textElement = document.createElement('span');
        textElement.textContent = text;
        textElement.style.backgroundColor = 'red';
        textElement.style.color = 'white';
        textElement.style.padding = '5px 10px';
        textElement.style.borderRadius = '5px';
        // 添加悬停效果
        linkElement.addEventListener('mouseover', function () {
            textElement.style.backgroundColor = 'darkred';
            textElement.style.color = 'yellow';
        });
        linkElement.addEventListener('mouseout', function () {
            textElement.style.backgroundColor = 'red';
            textElement.style.color = 'white';
        });
        linkElement.appendChild(textElement);
        textContainer.appendChild(linkElement);
        // 为“普通品秒变认证品”添加点击事件监听器
        if (text === "普通品秒变认证品") {
            linkElement.addEventListener('click', function (e) {
                e.preventDefault(); // 阻止默认的链接跳转行为
                // 创建新的 <style> 元素
                const styleElement = document.createElement('style');
                // 要插入的 CSS 代码
                const cssCode = `
                    h1:after {
                        content: url(https://sc04.alicdn.com/kf/H881b6508f9384f21a4eccba7208c3bd6i/276139825/H881b6508f9384f21a4eccba7208c3bd6i.png);
                        margin-right: 4px;
                    }
                `;
                styleElement.textContent = cssCode;
                // 将 <style> 元素添加到文档的 <head> 中
                document.head.appendChild(styleElement);
                alert('已成功为标题添加认证图标！');
            });
        }
        // 为“自动跳转WhatsApp”添加点击事件监听器
        if (text === "自动跳转WhatsApp") {
            linkElement.addEventListener('click', function (e) {
                e.preventDefault(); // 阻止默认的链接跳转行为
                // 创建 HTML 元素
                const whatsappDiv = document.createElement('div');
                whatsappDiv.id = 'whatsapp';
                const whatsappLink = document.createElement('a');
                whatsappLink.href = 'https://api.whatsapp.com/send?phone=8619912077677';
                whatsappLink.target = '_blank';
                whatsappLink.title = 'Whatsapp';
                const whatsappMainDiv = document.createElement('div');
                whatsappMainDiv.id = 'whatsappMain';
                whatsappLink.appendChild(whatsappMainDiv);
                whatsappDiv.appendChild(whatsappLink);
                document.body.appendChild(whatsappDiv);
                // 创建新的 <style> 元素
                const styleElement = document.createElement('style');
                // 要插入的 CSS 代码
                const cssCode = `
                    #whatsapp #whatsappMain:before {
                        content: "";
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        z-index: 9;
                        background-image: url(https://cdn.globalso.com/thedrillstore/style/global/img/foot_whatsapp.png);
                        background-repeat: no-repeat;
                        background-position: center center;
                        background-position-x: center;
                        background-position-y: center;
                        animation: 1.5s linear infinite zcwphone2;
                    }
                    #whatsapp #whatsappMain {
                        border-radius: 50% !important;
                        background-clip: padding-box;
                        background-color: rgba(255, 255, 255, 0);
                        width: 70px;
                        height: 70px;
                        color: #40c351;
                        z-index: 9;
                        animation: 1.5s ease-out infinite zcwmini2;
                    }
                    #whatsapp {
                        position: fixed;
                        right: 34px;
                        left: 50px;
                        top: 40%;
                        width: 70px;
                        height: 70px;
                        opacity: 1;
                        z-index: 99990;
                    }
                    @keyframes zcwmini2 {
                        0% {
                            box-shadow: 0 0 8px 6px rgba(207, 8, 8, 0), 0 0 0 0 transparent, 0 0 0 0 rgba(207, 8, 8, 0);
                        }
                        10% {
                            box-shadow: 0 0 8px 6px, 0 0 12px 10px transparent, 0 0 12px 14px;
                        }
                        100% {
                            box-shadow: 0 0 8px 6px rgba(207, 8, 8, 0), 0 0 0 40px transparent, 0 0 0 40px rgba(207, 8, 8, 0);
                        }
                    }
                    @keyframes zcwphone2 {
                        0% {
                            transform: rotate(0);
                        }
                        25% {
                            transform: rotate(30deg);
                        }
                        50% {
                            transform: rotate(0);
                        }
                        75% {
                            transform: rotate(-30deg);
                        }
                        100% {
                            transform: rotate(0);
                        }
                    }
                `;
                styleElement.textContent = cssCode;
                // 将 <style> 元素添加到文档的 <head> 中
                document.head.appendChild(styleElement);
                alert('已成功添加WhatsApp图标！');
            });
        }
        // 为“全屏询盘”添加点击事件监听器
        if (text === "全屏询盘") {
            linkElement.addEventListener('click', function (e) {
                e.preventDefault(); // 阻止默认的链接跳转行为
                // 创建 HTML 元素
                const link = document.createElement('a');
                link.href = "#";
                link.target = "_blank";
                const moDiv = document.createElement('div');
                moDiv.id = "mo";
                link.appendChild(moDiv);
                document.body.appendChild(link);
                // 创建新的 <style> 元素
                const styleElement = document.createElement('style');
                // 要插入的 CSS 代码
                const cssCode = `
                    body {
                        background-color: transparent;
                    }
                    #mo {
                        position: fixed;
                        left: 0;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        background:  url('https://sc04.alicdn.com/kf/H74924648a78b4f98bc7531e9da5c4643H/276139825/H74924648a78b4f98bc7531e9da5c4643H.png');
                        -webkit-animation: snow 15s linear infinite;
                        animation: snow 15s linear infinite;
                    }
                    @keyframes snow {
                        0% {
                            background-position: 0 0, 0 0;
                        }
                        100% {
                            background-position: 500px 1000px, 500px 500px;
                        }
                    }
                    @-webkit-keyframes snow {
                        0% {
                            background-position: 0 0, 0 0;
                        }
                        100% {
                            background-position: 500px 1000px, 500px 500px;
                        }
                    }
                `;
                styleElement.textContent = cssCode;
                // 将 <style> 元素添加到文档的 <head> 中
                document.head.appendChild(styleElement);
                alert('已成功开启全屏询盘背景效果！');
            });
        }
    });
    // 将黑色文本元素添加到容器中
    textContainer.prepend(blackTextElement);
    // 创建用于显示额外信息的元素
    const extraInfoElement = document.createElement('p');
    extraInfoElement.style.backgroundColor = '#ffffcc'; // 浅黄底色
    extraInfoElement.style.color = '#000000'; // 深黑文字
    extraInfoElement.style.fontSize = '14px';
    extraInfoElement.style.marginTop = '5px';
    extraInfoElement.style.padding = '5px 10px'; // 添加内边距
    extraInfoElement.style.borderRadius = '5px'; // 圆角边框
    const crownIcon = '👑 ';
    extraInfoElement.textContent = `${crownIcon}【公众号：国际站运营学堂】【磊哥交流V： z123456zjl 】`;
    // 创建一个用于显示关键词的新元素
    const keywordsDisplayElement = document.createElement('p');
    // 设置样式
    keywordsDisplayElement.style.backgroundColor = '#ffe5e5'; // 浅红底色
    keywordsDisplayElement.style.color = '#cc5500'; // 深色橙色文本
    keywordsDisplayElement.style.fontSize = '14px';
    keywordsDisplayElement.style.marginTop = '5px';
    keywordsDisplayElement.style.padding = '5px 10px'; // 添加内边距
    keywordsDisplayElement.style.borderRadius = '5px'; // 圆角边框
    // 如果有提取到的关键词，将其显示出来并添加放大镜标志
    if (topThreeExtracted.length > 0) {
        const magnifierIcon = '🔍 ';
        keywordsDisplayElement.textContent = `关键词: ${magnifierIcon}${topThreeExtracted.join(', ')}`;
    } else {
        keywordsDisplayElement.textContent = '未提取到有效关键词';
    }
    // 创建新容器用于包裹所有文本元素
    const outerContainer = document.createElement('div');
    outerContainer.style.border = '1px solid #ccc'; // 浅灰色边框
    outerContainer.style.padding = '10px'; // 内边距
    outerContainer.style.borderRadius = '5px'; // 圆角边框
    outerContainer.style.marginTop = '5px';
    // 交换添加顺序
    outerContainer.appendChild(extraInfoElement);
    outerContainer.appendChild(textContainer);
    outerContainer.appendChild(keywordsDisplayElement);
    // 插入新容器到标题元素之后
    titleElement.parentNode.insertBefore(outerContainer, titleElement.nextSibling);
    // 创建“访客详情数据一键下载”按钮
    const downloadButton = document.createElement('a');
    downloadButton.href = 'https://data.alibaba.com/marketing/visitor?';
    downloadButton.target = '_blank';
    downloadButton.style.backgroundColor = 'red';
    downloadButton.style.color = 'white';
    downloadButton.style.padding = '5px 10px';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.textDecoration = 'none';
    downloadButton.style.display = 'inline-block';
    downloadButton.style.marginTop = '10px';
    downloadButton.textContent = '访客详情数据一键下载';
    // 添加悬停效果
    downloadButton.addEventListener('mouseover', function () {
        downloadButton.style.backgroundColor = 'darkred';
        downloadButton.style.color = 'yellow';
    });
    downloadButton.addEventListener('mouseout', function () {
        downloadButton.style.backgroundColor = 'red';
        downloadButton.style.color = 'white';
    });
    // 将按钮添加到 outerContainer 中
    outerContainer.appendChild(downloadButton);

    // 创建“一键下载视频”按钮
    const videoDownloadButton = document.createElement('a');
    videoDownloadButton.href = '#'; // 先设置为占位符，后续根据实际视频地址修改
    videoDownloadButton.target = '_blank';
    videoDownloadButton.style.backgroundColor = 'red';
    videoDownloadButton.style.color = 'white';
    videoDownloadButton.style.padding = '5px 10px';
    videoDownloadButton.style.borderRadius = '5px';
    videoDownloadButton.style.textDecoration = 'none';
    videoDownloadButton.style.display = 'inline-block';
    videoDownloadButton.style.marginTop = '10px';
    videoDownloadButton.style.marginLeft = '10px';
    videoDownloadButton.textContent = '一键下载视频';
    // 添加悬停效果
    videoDownloadButton.addEventListener('mouseover', function () {
        videoDownloadButton.style.backgroundColor = 'darkred';
        videoDownloadButton.style.color = 'yellow';
    });
    videoDownloadButton.addEventListener('mouseout', function () {
        videoDownloadButton.style.backgroundColor = 'red';
        videoDownloadButton.style.color = 'white';
    });

    // 将“一键下载视频”按钮添加到 outerContainer 中
    outerContainer.appendChild(videoDownloadButton);

    // 查找主图视频元素
    const mainVideo = document.querySelector('video');
    if (mainVideo) {
        const videoSrc = mainVideo.src;
        if (videoSrc) {
            videoDownloadButton.href = videoSrc;
        }
    }
});
'use strict';

var globalAllresult = [];
var onlyKeyWordResult = [];
var visitorTotalCount = 0;
var downloaded = false;

// 下面这段代码生成下载方式
(function (console) {
    console.save = function (data, filename) {
        if (!data) {
            console.error('Console.save: No data found!');
            return;
        }
        if (!filename) filename = 'console.json';
        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4);
        }
        var blob = new Blob([data], { type: 'text/json' });
        var a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        var e = new MouseEvent("click");
        a.dispatchEvent(e);
    };
})(console);

// 定义去除开和标签方法
function removeTag(source) {
    const regexOpen = /<[^(\/)|(>)]+>/g;
    const regexCLose = /<\/[^>]+>/g;
    source = source.replace(regexOpen, "");
    source = source.replace(regexCLose, ",");
    return source;
}

function JSONToCSV(jsonData) {
    if (jsonData.length === 0) return '';

    const header = Object.keys(jsonData[0]).join(',') + '\n';
    const csvData = jsonData.map(row => {
        return Object.values(row).join(',');
    }).join('\n');

    return header + csvData;
}

function resetData() {
    // 重置数据
    globalAllresult = [];
    onlyKeyWordResult = [];
    downloaded = false;
    visitorTotalCount = 0;
}

// 访客详情页收集关键词方法
function collectKeywords() {
    var IDSource = document.getElementsByClassName("td-visitor align-left");
    var CountrySource = document.getElementsByClassName('ui2-flag');
    var ViewCountSource = document.getElementsByClassName('td-pv-span');
    var PeriodTimeSource = document.getElementsByClassName('td-stay-duration align-center');
    var KeywordSource = document.getElementsByClassName("td-search-keywords align-left");
    var storeActionSource = document.getElementsByClassName('td-minisite-active align-left');
    var aliActionSource = document.getElementsByClassName('td-website-active align-left');
    var buyerTagSource = document.getElementsByClassName('buyer-tag');
    var result = [];
    for (var i = 0; i < IDSource.length; i++) {
        let temp = (KeywordSource[i].getElementsByTagName('div')[0]) ? (KeywordSource[i].getElementsByTagName('div')[0].getAttribute('data-text')) : '-';
        let buyerTag = '-';

        // 修改 StoreActivities
        let storeActivities = storeActionSource[i].innerText || '无旺铺行为';
        if (storeActivities.includes('已发起询盘') || storeActivities.includes('已发起TM咨询')) {
            storeActivities = 'Y';
        } else {
            storeActivities = '';
        }

        // 修改 WebActivities
        let webActivities = removeTag(aliActionSource[i].innerHTML).replace(/(^\s*)|(\s*$)/gm, "");
        if (webActivities.includes('供应商发起')) {
            webActivities = 'Y';
        } else {
            webActivities = '';
        }

        // 修改 BuyerLevel
        if (buyerTagSource[i] && buyerTagSource[i].classList.contains('buyer-tag-l1')) {
            buyerTag = 'L1';
        } else if (buyerTagSource[i] && buyerTagSource[i].classList.contains('buyer-tag-l2')) {
            buyerTag = 'L2';
        } else if (buyerTagSource[i] && buyerTagSource[i].classList.contains('buyer-tag-l3')) {
            buyerTag = 'L3';
        } else if (buyerTagSource[i] && buyerTagSource[i].classList.contains('buyer-tag-l4')) {
            buyerTag = 'L4';
        } else {
            buyerTag = '';
        }

        result.push({
            'VisitorID': IDSource[i].innerText,
            'Area': CountrySource[i].title,
            'ViewCount': ViewCountSource[i].innerText,
            'StayTime': PeriodTimeSource[i].innerText,
            'Keywords': removeTag(temp).replace(/,/g, ';'),
            'SentToUs': storeActivities,
            'SentToOthers': webActivities,
            'BuyerLevel': buyerTag
        });
    }
    visitorTotalCount += IDSource.length;
    return result;
}

// 生成样式
var style = document.createElement('style');
style.textContent = '#down_video_btn{color:#fa7d3c;}';
document.head.appendChild(style);

// 下载按钮的html代码
var down_btn_html = '<span>';
down_btn_html += '<a href="javascript:void(0);" id="down_video_btn" class="S_txt2" title="【磊哥温馨提示】请先选择好需要统计的时间区间，并定位到第一页，然后点击此按钮，每点一次会自动翻页，到最后一页时将完成统计">快速统计访客详情数据</a>';
down_btn_html += '</span>';
var inner = document.createElement('span');
inner.innerHTML = down_btn_html;

// 将以上拼接的html代码插入到网页标签中
var ul_tag = document.getElementsByClassName('ui-button btn-search')[0].parentNode;
if (ul_tag) {
    ul_tag.append(inner);
}
var btn = document.getElementById('down_video_btn');

btn.onclick = function () {
    if (downloaded) return; // 防抖，防止多次下载，刷新重启

    var nextBtn = document.getElementsByClassName('ui-pagination-next')[0];

    if (!(nextBtn.classList.contains('ui-pagination-disabled'))) {
        let result = collectKeywords();
        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
            onlyKeyWordResult.push(result[i].Keywords);
        }
        globalAllresult.push(result);
        nextBtn.click();
    } else {
        let result = collectKeywords();
        for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
            onlyKeyWordResult.push(result[i].Keywords);
        }
        globalAllresult.push(result);
        globalAllresult = [].concat(...globalAllresult);
        onlyKeyWordResult = [].concat(...onlyKeyWordResult);

        // 在最后一页收集完数据后，统计信息
        let ourInquiryCount = 0;
        let peerInquiryCount = 0;
        let l1BuyerCount = 0;

        for (const visitor of globalAllresult) {
            if (visitor.SentToUs) {
                ourInquiryCount++;
            }
            if (visitor.SentToOthers) {
                peerInquiryCount++;
            }
            if (visitor.BuyerLevel) {
                l1BuyerCount++;
            }
        }

        // 创建统计结果对象
        const statistics = {
            "访客总数": `total:${visitorTotalCount}`,
            'L1买家数量': `L1+:${l1BuyerCount}`,
            '给同行发询盘数量': `Others:${peerInquiryCount}`,
            '我们询盘数量': `Us:${ourInquiryCount}`
        };

        // 将统计结果添加到 globalAllresult 中
        globalAllresult.push(statistics);

        var clipboardText = `${visitorTotalCount}\t${l1BuyerCount}\t\t${peerInquiryCount}\t\t${ourInquiryCount}`;
        navigator.clipboard.writeText(clipboardText);

        var message = `访客总数：${visitorTotalCount}\n` +
            `L1+访客数量：${l1BuyerCount}\n` +
            `给同行发了询盘的访客数量：${peerInquiryCount}\n` +
            `给我们发了询盘的访客数量：${ourInquiryCount}\n` +
            '磊哥微信：z123456zjl\n' +
            '数据已复制进剪贴板，是否将收集的关键词以及访客信息导出为CSV文件？';

        if (confirm(message)) {
            const csvData = JSONToCSV(globalAllresult);
            const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const csvURL = URL.createObjectURL(csvBlob);
            const csvLink = document.createElement('a');
            csvLink.href = csvURL;
            csvLink.setAttribute('download', 'collectedVisitorInform.csv');
            csvLink.click();
            console.save(onlyKeyWordResult.join('\n'), "collectedKeyWords.csv");
        }
        downloaded = true;
        resetData();
    }
    // 下载数据，第一个参数是数据对象，第二个参数是要保存成文件的名字。
};
