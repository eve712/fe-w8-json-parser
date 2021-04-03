export default class Parser {
    constructor() {
        this.property = null;
        this.stack = [];
        this.prevData = 0;
    }
    parse(lexResList) {
        lexResList.forEach(data => {
            //array, object 시작
            if (data.subType === "open") {
                //isProperty:1 (value==object)
                delete data.subType;
                if (this.prevData.type === "colon") this.setNode(data, 1);
                else this.setNode(data,0);
                this.stack.push(data.child);
            }
            //array, object 종료
            else if (data.subType === "close") this.stack.pop();
            // string, number, colon ...
            else {
                //colon이면 object property 생성
                if (data.type === "colon") {
                    this.property = {
                        type: null,
                        value: {
                            propKey: {
                                type: this.prevData.type,
                                value: this.prevData.value
                            },
                            propValue: {
                                type: null,
                                value: null
                            }
                        }
                    }
                    this.stack[this.stack.length - 1].pop();
                }
                else this.setNode(data,0);
            }
            this.prevData = data;
        });
        // 결과값 리턴
        return this.stack.pop();
    }
    //object의 property 생성 
    //isProperty:0 (value!=object) isProperty:1 (value==object)
    setNode(data, isProperty) {
        if (this.property) {
            this.property.type = "objectProperty";
            this.property.value.propValue.type = data.type;
            if (isProperty === 0) this.property.value.propValue.value = data.value;
            else this.property.value.propValue.value = data.child;    
            
            this.stack[this.stack.length - 1].push(this.property);
            this.property = null;
        }
        else {
            if (this.stack.length === 0) this.stack.push(data);
            else this.stack[this.stack.length - 1].push(data);
        }
    }
} 
