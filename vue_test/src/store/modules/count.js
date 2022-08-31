//求和相关的配置
export default {
	namespaced: true,//命名空间允许被外界访问
	actions: {
		jiaOdd(context, value) {
			console.log('actions中的jiaOdd被调用了')

			let aa = {
				['name']: '张三'
			}

			console.log(`--------------` + aa.name);

			if (context.state.sum % 2) {
				context.commit('JIA', value)
			}
		},
		// jiaWait(context, value) {
		// 	console.log('actions中的jiaWait被调用了')
		// 	setTimeout(() => {
		// 		context.commit('JIA', value)
		// 	}, 500)
		// }

		// 从context 中获得commit方法的地址
		jiaWait({commit}, value) {
			console.log('actions中的jiaWait被调用了')
			setTimeout(() => {
				commit('JIA', value)
			}, 500)
		}
	},
	mutations: {
		['JIA'](state, value) {
			console.log('mutations中的JIA被调用了')
			state.sum += value
		},
		JIAN(state, value) {
			console.log('mutations中的JIAN被调用了')
			state.sum -= value
		},
	},
	state: {
		sum: 0, //当前的和
		school: '北京大学',
		subject: '前端',
	},
	getters: {
		bigSum(state) {
			return state.sum * 10
		},
		/* 从 state 中筛选出 sum的值*/
		// bigSum({ sum }) {
		// 	return sum * 10
		// }
		realSchool: ({ school }) => '真是名字:' + school
	},
}