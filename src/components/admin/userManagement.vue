<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user'
import { useAuthStore } from '../../stores/auth'
import { message } from 'ant-design-vue'

const userStore = useUserStore()
const authStore = useAuthStore()
const users = ref([])

onMounted(async () => {
    // Sadece admin erişebilir
    if (!authStore.isAdmin) {
        message.error('Bu sayfaya erişim yetkiniz yok')
        router.push('/')
        return
    }
    
    // Kullanıcıları listele
    // ... kullanıcı listeleme kodu
})
</script>

<template>
    <div class="admin-panel">
        <h2>Kullanıcı Yönetimi</h2>
        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <button @click="editUser(user)">Düzenle</button>
                        <button @click="deleteUser(user.id)">Sil</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>