export default class ChagptGachaNew {
    constructor() {
        this.drops = this.generateDrops();
        this.assignedDrops = [];

        this.prizePool = this.generatePool();
        this.assignedPrize = [];

        this.attemptsCount = 0;
        this.pity3Limit = 25;
        this.threshold3 = 0;
        this.threshold4 = 50;
        this.threshold5 = 70;

        // useless property
        this.pityCounter3 = 0;
        this.pityCounter4 = 0;
        this.pityCounter5 = 0;
    }

    roll(amount=5) {
        // console.log('amount', amount)
        const roll = [];
        for (let i = 0; i < amount; i++) {
            roll.push(this.rollOnce());
        }

        // console.log('this.attemptsCount', this.attemptsCount)
        // console.log('this.threshold3', this.threshold3)
        // console.log('this.threshold4', this.threshold4)
        // console.log('this.threshold5', this.threshold5)

        return roll;
    }

    rollOnce() {
        this.attemptsCount++;

        this.shuffleArray(this.drops);
        this.shuffleArray(this.prizePool);
        const item = this.drops.pop();

        for (let idx = 0; idx < this.prizePool.length; idx++) {
            const prize = this.prizePool[idx];

            if (this.attemptsCount === (this.threshold3 + this.pity3Limit)) {
                if (prize.level === '3-star') {
                    this.threshold3 += this.pity3Limit;
                    this.assignPrizeToItem(idx, item);
                    break;
                }
            } else {
                if (prize.level === '5-star' && this.attemptsCount > this.threshold5) {
                    this.assignPrizeToItem(idx, item);
                    break;
                } else if (prize.level === '4-star' && this.attemptsCount > this.threshold4) {
                    this.assignPrizeToItem(idx, item);
                    break;
                } else if (prize.level === '3-star' && this.attemptsCount > this.threshold3) {
                    this.threshold3 += this.pity3Limit;
                    this.assignPrizeToItem(idx, item);
                    break;
                } else if (prize.level === '1-star' || prize.level === '2-star') {
                    this.assignPrizeToItem(idx, item);
                    break;
                }
            }
        }

        // console.log('item.assigned', item.assigned)
        // console.log('item.assignedLevel', item.assignedLevel)
        // console.log('drops.length', this.drops.length)
        // console.log('prizePool.length', this.prizePool.length)
        // console.log('assignedDrops.length', this.assignedDrops.length)
        // console.log('assignedPrize.length', this.assignedPrize.length)

        return item;
    }

    assignPrizeToItem(idx, item) {
        const prize = this.prizePool.splice(idx, 1)[0];
        item.assigned = true;
        item.assignedLevel = prize.level;
        item.assignedRating = prize.rating;
        item.assignedLevelChs = this.Level2LevelChs(prize.level);
        item.color = this.Level2Color(prize.level)

        prize.assigned = true;
        prize.assignToId = item.id;
        prize.assignToTeaType = item.teaType;
        prize.assignToUniqueId = item.uniqueId;

        this.assignedDrops.push(item);
        this.assignedPrize.push(prize);
    }

    generateDrops(lastIdxDict = { 'tea_a': 199, 'tea_b': 199, 'tea_c': 199, 'tea_d': 199, 'tea_e': 199, 'tea_f': 199 }) {
        const drops = [];
        let uniqueId = 0;

        for (const teaType in lastIdxDict) {
            for (let j = 0; j < lastIdxDict[teaType]; j++) {

                const src = `${teaType}.png`;
                const teaName = this.TeaType2TeaName(teaType);
                const teaNameId = `${teaName}-${j}`;
                const bgcolor = this.TeaType2TeaColor(teaType)
                const lettercolor = this.TeaType2LetterColor(teaType)

                drops.push({
                    teaType: teaType,
                    id: j,
                    src: src,
                    teaName: teaName,
                    teaNameId: teaNameId,
                    uniqueId: uniqueId,
                    assigned: false,
                    assignedLevel: '0-star',
                    assignedRating: 0,
                    assignedLevelChs: '未获奖',
                    color: '#000000',
                    bgcolor: bgcolor,
                    lettercolor: lettercolor,
                });
                uniqueId++;
            }
        }

        return drops;
    }

    TeaType2TeaName(teaType) {
        switch(teaType){
            case 'tea_a':
                return '高山乌龙'
            case 'tea_b':
                return '凤凰单枞'
            case 'tea_c':
                return '玫瑰红茶'
            case 'tea_d':
                return '锡兰红茶'
            case 'tea_e':
                return '安溪铁观音'
            case 'tea_f':
                return '金骏眉'
        }
    }

    TeaType2TeaColor(teaType) {
        switch(teaType){
            case 'tea_a':
                return '#d6c6bc'
            case 'tea_b':
                return '#fcc5a8'
            case 'tea_c':
                return '#f6cad4'
            case 'tea_d':
                return '#dc8d5f'
            case 'tea_e':
                return '#78c9a8'
            case 'tea_f':
                return '#a4b9c9'
        }
    }

    TeaType2LetterColor(teaType) {
        switch(teaType){
            case 'tea_a':
                return '#c96312'
            case 'tea_b':
                return '#c54600'
            case 'tea_c':
                return '#bf2849'
            case 'tea_d':
                return '#7d2e1e'
            case 'tea_e':
                return '#1d5f00'
            case 'tea_f':
                return '#78770f'
        }
    }

    Level2LevelChs(Level) {
        switch(Level){
            case '1-star':
                return '三等奖'
            case '2-star':
                return '二等奖'
            case '3-star':
                return '一等奖'
            case '4-star':
                return '特等奖'
            case '5-star':
                return '姚姚领先奖'
        }
    }

    Level2Color(Level) {
        switch(Level){
            case '1-star':
                return '#39b54a'
            case '2-star':
                return '#0071bc'
            case '3-star':
                return '#7030a0'
            case '4-star':
                return '#ff8800'
            case '5-star':
                return '#e94121'
        }
    }



    generatePool(prizeNumDict = { '1-star': 60, '2-star': 10, '3-star': 3, '4-star': 1, '5-star': 1 }) {
        const pool = [];

        for (const level in prizeNumDict) {
            for (let num = 0; num < prizeNumDict[level]; num++) {

                const match = level.match(/^(\d)-star$/);
                const rating = match ? parseInt(match[1]) : 0;

                pool.push({
                    level: level,
                    rating: rating,
                    id: num,
                    assigned: false,
                    assignToId: 0,
                    assignToTeaType: 'tea_x',
                    assignToUniqueId: 0,
                });
            }
        }

        return pool;
    }

    getState() {
        return {
            attemptsCount: this.attemptsCount,
            threshold3: this.threshold3,
            drops: this.drops,
            prizePool: this.prizePool,
            assignedDrops: this.assignedDrops,
            assignedPrize: this.assignedPrize,
        };
    }

    setState(state) {
        this.attemptsCount = state.attemptsCount;
        this.threshold3 = state.threshold3;
        this.drops = state.drops;
        this.prizePool = state.prizePool;
        this.assignedDrops = state.assignedDrops;
        this.assignedPrize = state.assignedPrize;
    }

    reset() {
        this.attemptsCount = 0;
        this.threshold3 = 0;
        this.drops = this.generateDrops();
        this.prizePool = this.generatePool();
        this.assignedDrops = [];
        this.assignedPrize = [];
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}