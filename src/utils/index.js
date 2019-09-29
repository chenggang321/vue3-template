export const local = {
    set(key, value) {
        window.localStorage[key] = value;
    },
    //读取单个属性
    get(key, defaultValue) {
        return window.localStorage[key] || defaultValue;
    },
    //存储对象，以JSON格式存储
    setObject(key, value) {
        window.localStorage[key] = JSON.stringify(value);
    },
    //读取对象
    getObject(key) {
        return JSON.parse(window.localStorage[key] || '{}');
    },
    //删除单个对象
    remove(key) {
        window.localStorage.removeItem(key);
    },
    //删除所有
    removeAll() {
        window.localStorage.clear();
    }
};

export const utils = {
    /**
     * 对象转为数组
     * @param obj
     */
    obj2array(obj) {
        let list = [];
        Object.keys(obj).forEach((key) => {
            const grade = {
                key,
                value: obj[key]
            };
            list.push(grade)
        });
        return list;
    },
};
export default {
    install: function (vm) {
        vm.prototype.$local = local
        vm.prototype.$utils = utils
    }
}
