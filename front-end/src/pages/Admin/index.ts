import { getAll, remove } from "../../api/product"
import AdminHeader from "../../components/Header/Admin"
import Sidebar from "../../components/Sidebar"
import Product from "../../model/product"
import reRender from "../../ultilities/reRender"

const AdminPage = {
    render: async () => {
        const res = await getAll()
        const data: Product[] = res.data
        console.log(data)
        return /*html*/`
        ${AdminHeader.render()}
        <div class="flex mt-4 divide-x">
            <div class="w-[250px] flex-none">
                ${Sidebar.render()}
            </div> 
            <div class="grow px-4">
                <div class="flex justify-between">
                    <div class="font-bold">
                    Sản phẩm chung
                    </div>
                    <a href="/admin/products/add">
                    <svg class="h-[80px] float-right pt-4 pr-6" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </a>
                </div>
                <div class="">
                    <label class="font-bold">Bộ lọc:</label>
                    <div>
                        Danh mục sản phẩm:
                        <select class="border">
                            <option value="all" class="target" data-id="all">Tất cả</option>
                            <option value="iphone" class="target" data-id="iphone">Iphone</option>
                            <option value="samsung" class="target" data-id="samsung"> Samsung</option>
                            <option value="xiaomi" class="target" data-id="xiaomi">Xiaomi</option>
                            <option value="oppo" class="target" data-id="oppo">Oppo</option>
                        </select>
                    </div>
                </div>
                <table class="table-auto border mt-8">     
                    <thead>
                    <tr>
                        <th class="w-[2%] border">#</th>
                        <th class="w-[15%] border">Tên sản phẩm</th>
                        <th class="w-[10%] border">Gía</th>
                        <th class="w-[10%] border">Gía sale</th>
                        <th class="w-[38%] border">Mô tả</th>
                        <th class="w-[5%] border text-center">Xóa</th>
                        <th class="w-[5%] border">Cập nhật</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${data.map((item, index) => /*html*/`
                        <tr>
                            <td class="border text-center">${index + 1}</td>
                            <td class="border">${item.name}</td>
                            <td class="border">${item.originalPrice}</td>
                            <td class="border">${item.saleOffPrice}</td>
                            <td class="border">${item.description}</td>
                            <td class="border">
                            <button class="btn btn-remove ml-4" data-id=${item.id}><svg class="mx-auto" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 15.5C17.7849 15.5 19.2778 14.137 19.464 12.3681C19.4897 12.1245 19.4897 11.8755 19.464 11.6319C19.2778 9.86302 17.7849 8.5 16 8.5C14.2152 8.5 12.7222 9.86302 12.536 11.6319C12.5104 11.8755 12.5104 12.1245 12.536 12.3681C12.7222 14.137 14.2152 15.5 16 15.5Z" fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9257 18.75H8.07434C4.75284 18.75 1.92497 16.3336 1.40694 13.0527C1.29681 12.3552 1.29681 11.6448 1.40694 10.9473C1.92497 7.6664 4.75285 5.25 8.07434 5.25H15.9257C19.2472 5.25 22.075 7.6664 22.5931 10.9473C22.7032 11.6448 22.7032 12.3552 22.5931 13.0527C22.075 16.3336 19.2472 18.75 15.9257 18.75ZM15.9257 17.25C18.5091 17.25 20.7085 15.3706 21.1114 12.8188C21.1971 12.2763 21.1971 11.7237 21.1114 11.1812C20.7085 8.62942 18.5091 6.75 15.9257 6.75L8.07434 6.75C5.49096 6.75 3.2915 8.62942 2.88859 11.1812C2.80293 11.7237 2.80293 12.2763 2.88858 12.8188C3.2915 15.3706 5.49095 17.25 8.07434 17.25H15.9257Z" fill="black"/>
                            </svg></button>
                            </td>
                            <td class="border">
                                <a href="/admin/products/edit/${item.id}"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg></a>
                            </td>
                        </tr>
                    `).join('')}
                    </tbody>
                </table>         
            </div>
        </div>
        `
    },
    afterRender() {
        const btns = document.querySelectorAll('table .btn'); // nodeList=[btn]
        console.log('btns', btns);
        for (let btn of btns) {
            // lấy thuộc tính data-id của button
            const id = btn.dataset.id;
            btn.addEventListener('click', async function () {
                if (btn.classList.contains('btn-remove')) {
                    const confirm = window.confirm('Bạn có chắc chắn xóa không?');
                    if (confirm) {
                        const res = await remove(id);
                        const data: Product[] = res.data
                        reRender('app', AdminPage);
                        if (data) {
                            console.log('delete thành công!');
                        }
                    }
                }
            });
        }
        //filter
        // const filterTargets = document.querySelectorAll(".target");

        // filterTargets.forEach(function (item) {
        // item.addEventListener("click", function (e) {
        //     addFilterClass(e.target)
        //     const category = e.currentTarget.dataset.id;
        //     if (category === "all") {
        //     render(AdminPage);
        //     } else {
        //     const menuCategory = menu.filter(function (item) {
        //         return item.category === category;
        //     });
        //     render(menuCategory);
        //     }
        // });
        // });
    },

}

export default AdminPage