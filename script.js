// 1. SCL-90核心数据（保持不变）
const scl90Questions = [
    "头痛", "神经过敏，心中不踏实", "头脑中有不必要的想法或字句盘旋", "头昏或昏倒", "对异性的兴趣减退",
    "对旁人责备求全", "感到别人能控制您的思想", "责怪别人制造麻烦", "忘记性大", "担心自己的衣饰整齐及仪态的端正",
    "容易烦恼和激动", "胸痛", "害怕空旷的场所或街道", "感到自己的精力下降，活动减慢", "想结束自己的生命",
    "听到旁人听不到的声音", "发抖", "感到大多数人都不可信任", "胃口不好", "容易哭泣",
    "同异性相处时感到害羞不自在", "感到受骗，中了圈套或有人想抓住您", "无缘无故地突然感到害怕", "自己不能控制地大发脾气", "怕单独出门",
    "经常责怪自己", "腰痛", "感到难以完成任务", "感到孤独", "感到苦闷",
    "过分担忧", "对事物不感兴趣", "感到害怕", "您的感情容易受到伤害", "旁人能知道您的私下想法",
    "感到别人不理解您、不同情您", "感到人们对您不友好，不喜欢您", "做事必须做得很慢以保证做得正确", "心跳得很厉害", "恶心或胃部不舒服",
    "感到比不上他人", "肌肉酸痛", "感到有人在监视您、谈论您", "难以入睡", "做事必须反复检查",
    "难以作出决定", "怕乘电车、公共汽车、地铁或火车", "呼吸有困难", "一阵阵发冷或发热", "因为感到害怕而避开某些东西、场合或活动",
    "脑子变空了", "身体发麻或刺痛", "喉咙有梗塞感", "感到前途没有希望", "不能集中注意",
    "感到身体的某一部分软弱无力", "感到紧张或容易紧张", "感到手或脚发重", "想到死亡的事", "吃得太多",
    "当别人看着您或谈论您时感到不自在", "有一些不属于您自己的想法", "有想打人或伤害他人的冲动", "醒得太早", "必须反复洗手、点数目或触摸某些东西",
    "睡得不稳不深", "有想摔坏或破坏东西的冲动", "有一些别人没有的想法或念头", "感到对别人神经过敏", "在商店或电影院等人多的地方感到不自在",
    "感到做任何事情都很困难", "一阵阵恐惧或惊恐", "感到在公共场合吃东西很不舒服", "经常与人争论", "单独一人时神经很紧张",
    "别人对您的成绩没有作出恰当的评价", "即使和别人在一起也感到孤单", "感到坐立不安心神不定", "感到自己没有什么价值", "感到熟悉的东西变成陌生或不像是真的",
    "大叫或摔东西", "害怕会在公共场合昏倒", "感到别人想占您的便宜", "为一些有关性的想法而很苦恼", "您认为应该因为自己的过错而受到惩罚",
    "感到要很快把事情做完", "感到自己的身体有严重问题", "从未感到和其他人很亲近", "感到自己有罪", "感到自己的脑子有毛病"
];

const factors = {
    "躯体化": [0, 11, 26, 38, 39, 46, 50, 71, 85],
    "强迫症状": [2, 28, 36, 44, 53, 62, 77, 87, 89],
    "人际关系敏感": [5, 20, 33, 35, 66, 68, 82],
    "抑郁": [4, 13, 14, 25, 29, 30, 47, 48, 54, 55, 72, 79, 86],
    "焦虑": [1, 10, 22, 32, 45, 56, 64, 74, 80],
    "敌对": [7, 21, 57, 69, 81, 83],
    "恐怖": [12, 23, 24, 40, 58, 59, 70, 75],
    "偏执": [6, 17, 34, 60, 63, 76, 84],
    "精神病性": [8, 15, 16, 31, 37, 41, 42, 61, 67, 78],
    "其他（饮食睡眠）": [3, 9, 18, 19, 27, 43, 49, 51, 52, 65, 73]
};

const factorExplanations = {
    "躯体化": "主要反映主观身体不适感，如头痛、背痛、肌肉酸痛及心血管、胃肠道不适。",
    "强迫症状": "指无法摆脱的无意义思想、冲动和行为，如反复检查、洗手。",
    "人际关系敏感": "表现为人际交往中的自卑感、不自在，担心他人评价。",
    "抑郁": "以苦闷情绪、生活兴趣减退、动力缺乏为特征，伴失望、悲观感受。",
    "焦虑": "表现为烦躁、坐立不安、紧张，及震颤等躯体征象。",
    "敌对": "从思想、感情、行为反映敌对，如厌烦、摔物、脾气爆发。",
    "恐怖": "恐惧出门、空旷场地、人群等，含社交恐怖表现。",
    "偏执": "含投射性思维、猜疑、关系妄想、被动体验等偏执性思维。",
    "精神病性": "反映急性精神病性症状，如幻觉、妄想、分裂性生活方式。",
    "其他（饮食睡眠）": "主要反映睡眠质量及饮食情况。"
};

// 2. 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', function() {
    generateQuestions();
    updateProgress();
    bindFormSubmit();
});

// 3. 动态生成测试题目（适配移动端样式，无额外逻辑修改）
function generateQuestions() {
    const questionsContainer = document.getElementById('questions');
    scl90Questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        // 生成的题目结构保持不变，样式由CSS控制
        questionElement.innerHTML = `
            <div class="question-number">${index + 1}. ${question}</div>
            <div class="options">
                <div class="option">
                    <input type="radio" id="q${index}-1" name="q${index}" value="1" required>
                    <label for="q${index}-1">没有</label>
                </div>
                <div class="option">
                    <input type="radio" id="q${index}-2" name="q${index}" value="2">
                    <label for="q${index}-2">很轻</label>
                </div>
                <div class="option">
                    <input type="radio" id="q${index}-3" name="q${index}" value="3">
                    <label for="q${index}-3">中等</label>
                </div>
                <div class="option">
                    <input type="radio" id="q${index}-4" name="q${index}" value="4">
                    <label for="q${index}-4">偏重</label>
                </div>
                <div class="option">
                    <input type="radio" id="q${index}-5" name="q${index}" value="5">
                    <label for="q${index}-5">严重</label>
                </div>
            </div>
        `;
        questionsContainer.appendChild(questionElement);

        // 为每个单选框绑定进度更新事件
        const radioInputs = questionElement.querySelectorAll('input[type="radio"]');
        radioInputs.forEach(radio => {
            radio.addEventListener('change', updateProgress);
        });
    });
}

// 4. 更新测试进度（保持不变）
function updateProgress() {
    const answeredCount = document.querySelectorAll('input[type="radio"]:checked').length;
    const remainingCount = 90 - answeredCount;
    
    document.getElementById('progress').textContent = answeredCount;
    document.getElementById('remaining').textContent = remainingCount;

    if (answeredCount === 90) {
        document.getElementById('completion-message').style.display = 'block';
    } else {
        document.getElementById('completion-message').style.display = 'none';
    }
}

// 5. 绑定表单提交事件（保持不变）
function bindFormSubmit() {
    const testForm = document.getElementById('scl90-test');
    testForm.addEventListener('submit', function(e) {
        e.preventDefault();

        document.getElementById('loading').style.display = 'block';
        document.querySelector('.submit-btn').disabled = true;

        setTimeout(() => {
            const answers = collectAnswers();
            if (!answers) {
                document.getElementById('loading').style.display = 'none';
                document.querySelector('.submit-btn').disabled = false;
                return;
            }

            const resultData = calculateResults(answers);
            displayResults(resultData);

            document.getElementById('loading').style.display = 'none';
            document.querySelector('.submit-btn').disabled = false;
        }, 800); // 缩短延迟时间，提升移动端响应速度
    });
}

// 6. 收集所有题目答案（保持不变）
function collectAnswers() {
    const answers = [];
    for (let i = 0; i < scl90Questions.length; i++) {
        const selectedRadio = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selectedRadio) {
            alert(`请回答第 ${i + 1} 题`);
            const targetQuestion = document.querySelector(`input[name="q${i}"]`).closest('.question');
            targetQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }
        answers.push(parseInt(selectedRadio.value));
    }
    return answers;
}

// 7. 计算测试结果（保持不变）
function calculateResults(answers) {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const positiveItems = answers.filter(score => score > 1).length;
    const positiveScore = positiveItems > 0 ? (totalScore / positiveItems).toFixed(2) : '0.00';
    const totalIndex = (totalScore / 90).toFixed(2);

    const factorScores = {};
    for (const [factorName, questionIndices] of Object.entries(factors)) {
        const factorTotal = questionIndices.reduce((sum, index) => sum + answers[index], 0);
        factorScores[factorName] = (factorTotal / questionIndices.length).toFixed(2);
    }

    return {
        totalScore,
        positiveItems,
        positiveScore,
        totalIndex,
        factorScores
    };
}

// 8. 显示测试结果（微调文本长度，适配移动端）
function displayResults(resultData) {
    const { totalScore, positiveItems, positiveScore, totalIndex, factorScores } = resultData;
    const resultsDiv = document.getElementById('results');
    const factorResultsTable = document.getElementById('factor-results');
    const factorDetailsContainer = document.getElementById('factor-details');

    // 1. 渲染总分相关数据
    document.getElementById('total-score').textContent = totalScore;
    document.getElementById('total-index').textContent = totalIndex;
    document.getElementById('positive-items').textContent = positiveItems;
    document.getElementById('positive-score').textContent = positiveScore;

    // 2. 清空历史结果
    factorResultsTable.innerHTML = '';
    factorDetailsContainer.innerHTML = '<h3>因子解释</h3>'; // 简化标题

    // 3. 渲染因子分表格和详细解释
    for (const [factorName, score] of Object.entries(factorScores)) {
        const scoreValue = parseFloat(score);
        let status, statusClass, statusExplanation;

        if (scoreValue < 1.5) {
            status = "正常";
            statusClass = "score-low";
            statusExplanation = "无明显症状"; // 简化说明文本
        } else if (scoreValue < 2) {
            status = "轻微";
            statusClass = "score-moderate";
            statusExplanation = "轻微症状，建议关注";
        } else if (scoreValue < 3) {
            status = "中等";
            statusClass = "score-high";
            statusExplanation = "中等症状，建议咨询";
        } else {
            status = "严重";
            statusClass = "score-high";
            statusExplanation = "症状严重，需专业帮助";
        }

        // 3.1 渲染因子分表格行
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${factorName}</td>
            <td>${score}</td>
            <td>1.0-1.5</td>
            <td class="${statusClass}">${status}</td>
            <td>${statusExplanation}</td>
        `;
        factorResultsTable.appendChild(tableRow);

        // 3.2 渲染因子详细解释（简化文本，避免移动端过长）
        const factorExplanationDiv = document.createElement('div');
        factorExplanationDiv.className = 'factor-explanation';
        factorExplanationDiv.innerHTML = `
            <h3>${factorName}</h3>
            <p><strong>得分：${score} | 状态：<span class="${statusClass}">${status}</span></strong></p>
            <p>${factorExplanations[factorName]}</p>
        `;
        factorDetailsContainer.appendChild(factorExplanationDiv);
    }

    // 4. 显示结果区域并滚动定位
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}
